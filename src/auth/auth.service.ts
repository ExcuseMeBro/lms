import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import jwtConfig from '../common/config/jwt.config';
import { PsqlErrorCode } from '../common/enums/error-codes.enum';
import { ActiveUserData } from '../common/interfaces/active-user-data.interface';
import { RedisService } from '../redis/redis.service';
import { User } from '../users/entities/user.entity';
import { BcryptService } from './bcrypt.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly redisService: RedisService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<void> {
    const { phone, password, role } = signUpDto;

    try {
      const user = new User();
      user.phone = phone;
      user.password = await this.bcryptService.hash(password);
      user.role = role;
      await this.userRepository.save(user);
    } catch (error) {
      if (error.code === PsqlErrorCode.UniqueViolation) {
        throw new ConflictException(`User [${phone}] already exist`);
      }
      throw error;
    }
  }

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const { phone, password } = signInDto;

    const user = await this.userRepository.findOne({
      where: {
        phone,
      },
    });

    if (!user) {
      throw new BadRequestException('Invalid phone');
    }

    const isPasswordMatch = await this.bcryptService.compare(
      password,
      user.password,
    );
    if (!isPasswordMatch) {
      throw new BadRequestException('Invalid password');
    }
    try {
      const tokens = JSON.parse(await this.redisService.get(user.phone));
      if (this.checkJWT(tokens?.accessToken)) {
        return tokens;
      } else {
        return await this.generateTokens(user);
      }
    } catch (e) {
      return await this.generateTokens(user);
    }
  }

  async refresh(token: string) {
    const isValidToken = this.checkJWT(token);
    if (isValidToken) {
      try {
        const user = JSON.parse(
          await this.redisService.get(`refresh_${token}`),
        ) as User;
        const tokens = JSON.parse(await this.redisService.get(user.phone));
        await this.redisService.delete(`access_${tokens?.accessToken}`);
        await this.redisService.delete(`refresh_${tokens?.refreshToken}`);

        return await this.generateTokens(user);
      } catch (e) {
        throw new BadRequestException('Invalid token!');
      }
    } else {
      throw new BadRequestException('Token expired!');
    }
  }

  async signOut(token: string): Promise<void> {
    try {
      const user = JSON.parse(
        await this.redisService.get(`access_${token}`),
      ) as User;
      const tokens = JSON.parse(await this.redisService.get(user.phone));
      await this.redisService.delete(`access_${tokens?.accessToken}`);
      await this.redisService.delete(`refresh_${tokens?.refreshToken}`);
      await this.redisService.delete(user.phone);
    } catch (e) {
      throw new BadRequestException('Error while logging out!');
    }
  }

  checkJWT(token: string) {
    return this.jwtService.verify(token)?.exp >= Math.floor(Date.now() / 1000);
  }

  async generateTokens(user: User) {
    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);
    const tokens = {
      ...accessToken,
      ...refreshToken,
    };
    await this.redisService.insert(user.phone, JSON.stringify(tokens));

    return tokens;
  }

  async generateAccessToken(user: { id: string; phone: string; role: string }): Promise<{ accessToken: string }> {
    const accessToken = await this.jwtService.signAsync(
      {
        id: user.id,
        phone: user.phone,
        role: user.role,
      } as ActiveUserData,
      {
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
      },
    );

    await this.redisService.insert(
      `access_${accessToken}`,
      JSON.stringify(user),
    );
    return { accessToken };
  }

  async generateRefreshToken(user: User): Promise<{ refreshToken: string }> {
    const refreshToken = await this.jwtService.signAsync(
      {},
      {
        secret: this.jwtConfiguration.secret,
        expiresIn: '8h',
      },
    );

    await this.redisService.insert(
      `refresh_${refreshToken}`,
      JSON.stringify(user),
    );
    return { refreshToken };
  }
}

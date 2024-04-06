import { ApiProperty } from '@nestjs/swagger';
import {
  IsPhoneNumber,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { Match } from '../../common/decorators/match.decorator';
import { Role } from 'src/common/enums/role.enum';

export class SignUpDto {
  @ApiProperty({
    example: '+998901234567',
    description: 'Phone of user',
  })
  @IsPhoneNumber('UZ')
  @IsNotEmpty()
  readonly phone: string;

  @ApiProperty({
    description: 'Password of user',
    example: 'Pass#123',
  })
  @MinLength(8, {
    message: 'password too short',
  })
  @MaxLength(20, {
    message: 'password too long',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({
    description: 'Repeat same value as in password field',
    example: 'Pass#123',
  })
  @Match('password')
  @IsNotEmpty()
  readonly passwordConfirm: string;

  @ApiProperty({
    description: 'Role of user',
    example: 'tech_admin',
  })
  @IsNotEmpty()
  readonly role: Role;
}

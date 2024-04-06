import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsPhoneNumber,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignInDto {
  @ApiProperty({
    description: 'Phone of user',
    example: '+998901234567',
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
}

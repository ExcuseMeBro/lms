import { ApiProperty } from '@nestjs/swagger';
import { IsAscii, IsNotEmpty, MinLength } from 'class-validator';

export class CreateEducenterDto {
  @ApiProperty({
    example: 'lms',
    description: 'EduCenter name',
  })
  @IsAscii()
  @IsNotEmpty()
  @MinLength(3, {
    message: 'Name too short',
  })
  name: string;

  @ApiProperty({
    example: 'Al-Xorazmiy ko`chasi',
    description: 'EduCenter address',
  })
  @IsAscii()
  @IsNotEmpty()
  @MinLength(8, {
    message: 'Address too short',
  })
  address: string;
}

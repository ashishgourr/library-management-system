import {
  IsEmail,
  IsNotEmpty,
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRole } from '../../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
//Validation Pipe for User Login

export class LoginDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'User password',
    minLength: 6,
    maxLength: 15,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(15)
  password: string;

  @ApiProperty({
    example: UserRole.MEMBER,
    enum: UserRole,
    description: 'User role',
  })
  @IsEnum(UserRole)
  role: UserRole;
}

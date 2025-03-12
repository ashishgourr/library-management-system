import {
  IsEmail,
  IsNotEmpty,
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRole } from 'src/entities/user.entity';

//Validation Pipe for User Login

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(15)
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}

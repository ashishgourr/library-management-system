import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { SignupDto } from './dtos/signup.dto';
import { UsersService } from './users.service';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  signup(@Body(ValidationPipe) signupDto: SignupDto) {
    return this.usersService.signup(signupDto);
  }

  @Post('/login')
  login(@Body(ValidationPipe) loginDto: LoginDto) {
    return this.usersService.login(loginDto);
  }
}

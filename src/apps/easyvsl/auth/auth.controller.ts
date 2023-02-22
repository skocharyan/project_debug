import { Controller } from '@nestjs/common';
import { Body, Post, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { UserLoginDto } from './common/dtos/user.login.dto';
import { AuthService } from './auth.service';
import { LoginResponse } from './models/login.response';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async logIn(@Body() userLoginDto: UserLoginDto): Promise<LoginResponse> {
    return this.authService.login(userLoginDto);
  }
}

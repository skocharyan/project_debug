// import { NotAcceptableException } from '@nestjs/common';
import { NotAcceptableException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from './common/dtos/user.login.dto';
import { UserService } from '../users/user.service';
import { LoginResponse } from './models/login.response';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.getUser({ email });
    const passwordValid = await bcrypt.compare(password, user.password);

    if (!user) {
      throw new NotAcceptableException('Could not find the user');
    }

    if (!passwordValid) {
      throw new NotAcceptableException('Could not find the user');
    }

    return user;
  }

  async login(userLoginDto: UserLoginDto): Promise<LoginResponse> {
    const payload = {
      email: userLoginDto.email,
      password: userLoginDto.password
    };
    const user = await this.userService.getUser({ email: userLoginDto.email });

    return {
      userId: user.id,
      access_token: this.jwtService.sign(payload)
    };
  }
}

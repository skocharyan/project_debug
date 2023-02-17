// import { NotAcceptableException } from '@nestjs/common';
import { NotAcceptableException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from '../dtos/user.login.dto';
import { UserService } from '../users/user.service';

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

  async login(userLoginDto: UserLoginDto) {
    const payload = {
      email: userLoginDto.email,
      password: userLoginDto.password
    };

    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}

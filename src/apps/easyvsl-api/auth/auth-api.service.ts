import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthPasswordResetRequest } from './models/password-reset.request';
import { UserStorageService } from '@modules/secondary/storage/user-storage/user-storage.service';
import { CryptoService } from '@modules/secondary/crypto/crypto.service';
import { User } from '@modules/secondary/storage/user-storage/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from '../user/common/dtos/user.login.dto';
import { LoginResponse } from './models/login.response';
import { UserApiService } from '../user/user-api.service';

@Injectable()
export class AuthApiService {
  constructor(
    private readonly userStorageService: UserStorageService,
    private readonly cryptoService: CryptoService,
    private readonly userService: UserApiService,
    private readonly jwtService: JwtService
  ) {}

  async resetPassword(
    passwordResetRequestData: AuthPasswordResetRequest
  ): Promise<{ msg: string }> {
    const { email, currentPassword, newPassword } = passwordResetRequestData;
    const user = await this.validateUser(email, currentPassword);

    if (!user) {
      throw new ForbiddenException(
        `Wrong Credentials Please check your email address and password to confirm it is correct.`
      );
    }

    await this.userStorageService.changePassword(
      {
        id: user.id
      },
      newPassword
    );

    return { msg: 'Password successfully reset' };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userStorageService.findOne({
      email
    });

    if (!user) {
      throw new ForbiddenException(
        `Wrong Credentials Please check your email address and password to confirm it is correct.`
      );
    }

    const isPasswordValid = await this.cryptoService.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return null;
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
      accessToken: this.jwtService.sign(payload)
    };
  }
}

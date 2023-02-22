import { User } from '@modules/secondary/storage/user-storage/user.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { config } from '@config/config';
import { UserApiService } from '../../apps/easyvsl-api/user/user-api.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserApiService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: config.jwt.secret,
      usernameField: 'email'
    });
  }

  async validate(email: string): Promise<User> {
    const user = this.userService.getUser({ email });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

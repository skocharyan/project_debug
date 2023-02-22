import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { config } from '@config/config';
import { UserApiService } from '../../apps/easyvsl-api/user/user-api.service';
import { IJwtPayloadType } from '@common/jwt/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserApiService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: config.jwt.secret
    });
  }

  async validate(payload: IJwtPayloadType) {
    const email = payload.email;
    const user = await this.userService.getUser({ email });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

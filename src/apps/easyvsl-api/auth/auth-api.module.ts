import { Module } from '@nestjs/common';
import { AuthApiController } from './auth-api.controller';
import { AuthApiService } from './auth-api.service';
import { UserStorageModule } from '@modules/secondary/storage/user-storage/user-storage.module';
import { CryptoModule } from '@modules/secondary/crypto/crypto.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { config } from '@config/config';
import { UserApiModule } from '../user/user-api.module';
import { LocalStrategy } from '../../../common/strategies/local.strategy';
import { JwtStrategy } from '../../../common/strategies/jwt.strategy';

@Module({
  imports: [
    UserStorageModule,
    UserApiModule,
    CryptoModule,
    PassportModule,
    JwtModule.register({
      secret: config.jwt.secret,
      signOptions: { expiresIn: config.jwt.expires_in }
    })
  ],
  controllers: [AuthApiController],
  providers: [AuthApiService, LocalStrategy, JwtStrategy]
})
export class AuthApiModule {}

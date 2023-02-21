import { Module } from '@nestjs/common';
import { AuthApiController } from './auth-api.controller';
import { AuthApiService } from './auth-api.service';
import { UserStorageModule } from '@modules/secondary/storage/user-storage/user-storage.module';
import { CryptoModule } from '@modules/secondary/crypto/crypto.module';

@Module({
  imports: [UserStorageModule, CryptoModule],
  controllers: [AuthApiController],
  providers: [AuthApiService]
})
export class AuthApiModule {}

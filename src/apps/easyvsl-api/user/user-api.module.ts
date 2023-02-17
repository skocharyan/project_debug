import { Module } from '@nestjs/common';
import { UserApiService } from './user-api.service';
import { UserStorageModule } from '@modules/secondary/storage/user-storage/user-storage.module';
import { CryptoModule } from '@modules/secondary/crypto/crypto.module';

@Module({
  imports: [UserStorageModule, CryptoModule],
  providers: [UserApiService],
  exports: [UserApiService]
})
export class UserApiModule {}

import { Module } from '@nestjs/common';
import { UserApiService } from './user-api.service';
import { UserStorageModule } from '@modules/secondary/storage/user-storage/user-storage.module';
import { CryptoModule } from '@modules/secondary/crypto/crypto.module';
import { PostmarkModule } from '@modules/secondary/mail/postmark.module';
import { UserApiController } from './user-api.controller';
import { HttpModule } from '@modules/secondary/api/http/http.module';

@Module({
  imports: [
    UserStorageModule,
    CryptoModule,
    PostmarkModule,
    HttpModule.register({
      baseUrl: '',
      timeout: 5000,
      keepAlive: false
    })
  ],
  providers: [UserApiService],
  controllers: [UserApiController],
  exports: [UserApiService]
})
export class UserApiModule {}

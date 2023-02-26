import { Module } from '@nestjs/common';
import { UserApiService } from './user-api.service';
import { UserStorageModule } from '@modules/secondary/storage/user-storage/user-storage.module';
import { CryptoModule } from '@modules/secondary/crypto/crypto.module';
import { PostmarkModule } from '@modules/secondary/mail/postmark.module';
import { UserApiController } from './user-api.controller';
import { PaykickstartTriggerModule } from '../paykickstart_trigger/paykickstart.module';
import { DeepGramModule } from '../deepgram/deepgram.module';
import { DeepgramStorageModule } from '@modules/secondary/storage/deepgram-storage/deepgram-storage.module';

@Module({
  imports: [
    DeepGramModule,
    UserStorageModule,
    CryptoModule,
    PostmarkModule,
    DeepgramStorageModule,
    PaykickstartTriggerModule
  ],
  providers: [UserApiService],
  controllers: [UserApiController],
  exports: [UserApiService]
})
export class UserApiModule {}

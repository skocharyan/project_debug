import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CryptoModule } from '@modules/secondary/crypto/crypto.module';
import { DeepGram } from './deppgram.entity';
import { DeepgramStorageService } from './deepgram-storage.service';

@Module({
  imports: [TypeOrmModule.forFeature([DeepGram]), CryptoModule],
  providers: [DeepgramStorageService],
  exports: [DeepgramStorageService]
})
export class DeepgramStorageModule {}

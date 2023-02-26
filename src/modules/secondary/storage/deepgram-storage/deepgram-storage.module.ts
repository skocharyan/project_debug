import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeepGram } from './deppgram.entity';
import { DeepgramStorageService } from './deepgram-storage.service';

@Module({
  imports: [TypeOrmModule.forFeature([DeepGram])],
  providers: [DeepgramStorageService],
  exports: [DeepgramStorageService]
})
export class DeepgramStorageModule {}

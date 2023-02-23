import { Module } from '@nestjs/common';
import { EasyvslApiModule } from '../apps/easyvsl-api/easyvsl-api.module';
import { StorageModule } from '@modules/secondary/storage/storage.module';

@Module({
  imports: [EasyvslApiModule, StorageModule],
  controllers: []
})
export class AppModule {}

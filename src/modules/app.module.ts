import { Module } from '@nestjs/common';
import { EasyvslApiModule } from '../apps/easyvsl-api/easyvsl-api.module';
import { StorageModule } from '@modules/secondary/storage/storage.module';
import { EasyVslModule } from 'src/apps/easyvsl/easyvsl.module';

@Module({
  imports: [EasyvslApiModule, StorageModule],
  controllers: []
})
export class AppModule {}

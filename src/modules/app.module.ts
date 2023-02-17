import { Module } from '@nestjs/common';
import { StorageModule } from '@modules/secondary/storage/storage.module';
import { EasyVslModule } from 'src/apps/easyvsl/easyvsl.module';

@Module({
  imports: [StorageModule, EasyVslModule],
  controllers: []
})
export class AppModule {}

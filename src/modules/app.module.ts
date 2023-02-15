import { Module } from '@nestjs/common';
import { StorageModule } from '@modules/secondary/storage/storage.module';

@Module({
  imports: [StorageModule],
  controllers: []
})
export class AppModule {}

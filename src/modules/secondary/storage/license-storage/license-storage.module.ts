import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LicenseStorageService } from './license-storage.service';
import { License } from './license.entity';

@Module({
  imports: [TypeOrmModule.forFeature([License])],
  providers: [LicenseStorageService],
  exports: [LicenseStorageService]
})
export class LicenseStorageModule {}

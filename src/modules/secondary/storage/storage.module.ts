import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ORM_CONFIG } from '@config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(ORM_CONFIG)]
})
export class StorageModule {}

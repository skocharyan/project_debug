import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@modules/secondary/storage/user-storage/user.entity';
import { UserStorageService } from '@modules/secondary/storage/user-storage/user-storage.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserStorageService],
  exports: [UserStorageService]
})
export class UserStorageModule {}

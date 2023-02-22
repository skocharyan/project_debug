import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@modules/secondary/storage/user-storage/user.entity';
import { UserStorageService } from '@modules/secondary/storage/user-storage/user-storage.service';
import { CryptoModule } from '@modules/secondary/crypto/crypto.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CryptoModule],
  providers: [UserStorageService],
  exports: [UserStorageService]
})
export class UserStorageModule {}

import { UserStorageModule } from '@modules/secondary/storage/user-storage/user-storage.module';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
  imports: [UserStorageModule],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}

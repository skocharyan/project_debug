import { TAtLeastOneRequired } from '@common/types/utils/types';
import { UserStorageService } from '@modules/secondary/storage/user-storage/user-storage.service';
import { User } from '@modules/secondary/storage/user-storage/user.entity';
import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';

@Injectable()
export class UserService {
  @Inject()
  private userStorageService: UserStorageService;

  async getUser(
    criteria: TAtLeastOneRequired<User>
  ): Promise<User | undefined> {
    return this.userStorageService.findOne(criteria);
  }
}

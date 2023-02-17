import { User } from '@modules/secondary/storage/user-storage/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TAtLeastOneRequired } from '@modules/common/types/utils/types';

@Injectable()
export class UserStorageService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>
  ) {}

  // async createOne

  async findOne(
    criteria: TAtLeastOneRequired<User>
  ): Promise<User | undefined> {
    return this.repository.findOne({ where: criteria });
  }

  async createOne(data: Pick<User, 'email' & Partial<User>>): Promise<User> {
    const newUser = this.repository.create(data);

    return this.repository.save(newUser);
  }
}

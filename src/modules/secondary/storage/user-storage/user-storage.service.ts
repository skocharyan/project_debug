import { User } from '@modules/secondary/storage/user-storage/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeAtLeastOneRequired } from '@modules/common/types/utils/types';
import { CreateUserInput } from '../../../../apps/easyvsl-api/user/models';

@Injectable()
export class UserStorageService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>
  ) {}

  // async createOne

  async findOne(
    criteria: TypeAtLeastOneRequired<User>
  ): Promise<User | undefined> {
    return this.repository.findOne({ where: criteria });
  }

  async createOne(data: CreateUserInput): Promise<User> {
    const newUser = this.repository.create(data);

    return this.repository.save(newUser);
  }
}

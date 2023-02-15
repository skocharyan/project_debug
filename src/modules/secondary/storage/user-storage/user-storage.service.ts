import { User } from '@modules/secondary/storage/user-storage/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserStorageService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>
  ) {}

  async find(): Promise<User[]> {
    return this.repository.find();
  }
}

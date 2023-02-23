import { User } from '@modules/secondary/storage/user-storage/user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeAtLeastOneRequired } from '@modules/common/types/utils/types';
import { CreateUserInput } from '../../../../apps/easyvsl-api/user/models';
import { CryptoService } from '@modules/secondary/crypto/crypto.service';

@Injectable()
export class UserStorageService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
    private readonly cryptoService: CryptoService
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

  async changePassword(
    criteria: TypeAtLeastOneRequired<Pick<User, 'id' | 'email'>>,
    password: string
  ): Promise<void> {
    try {
      password = await this.cryptoService.hash(password);

      await this.repository.update(criteria, {
        password
      });
    } catch (error) {
      throw new BadRequestException('Something went wrong');
    }
  }
}

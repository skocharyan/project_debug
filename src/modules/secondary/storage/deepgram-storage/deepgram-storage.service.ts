import { User } from '@modules/secondary/storage/user-storage/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeAtLeastOneRequired } from '@modules/common/types/utils/types';
import { CreateDeepGramInput } from 'src/apps/easyvsl-api/deepgram/models/create-deepgram.input';
import { DeepGram } from './deppgram.entity';

@Injectable()
export class DeepgramStorageService {
  constructor(
    @InjectRepository(DeepGram)
    private readonly repository: Repository<DeepGram>,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  // async createOne

  async findOne(
    criteria: TypeAtLeastOneRequired<DeepGram>
  ): Promise<DeepGram | undefined> {
    return this.repository.findOne({ where: criteria });
  }

  async createOne(user: User, data: CreateDeepGramInput): Promise<DeepGram> {
    const newKey = this.repository.create(data);
    user.deepGram = newKey;
    this.userRepository.save(user);

    return this.repository.save(newKey);
  }
}

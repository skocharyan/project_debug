import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeAtLeastOneRequired } from '@modules/common/types/utils/types';
import { DeepGram } from './deppgram.entity';
import { CreateDeepGramInput } from './models';

@Injectable()
export class DeepgramStorageService {
  constructor(
    @InjectRepository(DeepGram)
    private readonly repository: Repository<DeepGram>
  ) {}

  // async createOne

  async findOne(
    criteria: TypeAtLeastOneRequired<DeepGram>
  ): Promise<DeepGram | undefined> {
    return this.repository.findOne({ where: criteria });
  }

  async createOne(data: CreateDeepGramInput): Promise<DeepGram> {
    const newKey = this.repository.create(data);

    return this.repository.save(newKey);
  }
}

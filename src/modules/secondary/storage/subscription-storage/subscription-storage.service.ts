import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeAtLeastOneRequired } from '@modules/common/types/utils/types';
import { Subscription } from './subscription.entity';
import { ICreateSubscriptionInput } from './models';
@Injectable()
export class SubscriptionStorageService {
  constructor(
    @InjectRepository(Subscription)
    private readonly repository: Repository<Subscription>
  ) {}

  // async createOne

  async findOne(
    criteria: TypeAtLeastOneRequired<Subscription>
  ): Promise<Subscription | undefined> {
    return this.repository.findOne({ where: criteria });
  }

  async createOne(data: ICreateSubscriptionInput): Promise<Subscription> {
    const newSubscriptions = this.repository.create(data);

    return this.repository.save(newSubscriptions);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeAtLeastOneRequired } from '@modules/common/types/utils/types';
import { License } from './license.entity';
import { ICreateLicenseInput } from './models';

@Injectable()
export class LicenseStorageService {
  constructor(
    @InjectRepository(License)
    private readonly repository: Repository<License>
  ) {}

  async findOne(
    criteria: TypeAtLeastOneRequired<License>
  ): Promise<License | undefined> {
    return this.repository.findOne({ where: criteria });
  }

  async createOne(data: ICreateLicenseInput): Promise<License> {
    const newSubscriptions = this.repository.create(data);

    return this.repository.save(newSubscriptions);
  }
}

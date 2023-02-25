import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeAtLeastOneRequired } from '@modules/common/types/utils/types';
import { Product } from './product.entity';
import { ICreateProductInput } from './models';

@Injectable()
export class ProductStorageService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  // async createOne

  async findOne(
    criteria: TypeAtLeastOneRequired<Product>
  ): Promise<Product | undefined> {
    return this.productRepository.findOne({ where: criteria });
  }

  async createOne(data: ICreateProductInput): Promise<Product> {
    const newProduct = this.productRepository.create(data);

    return this.productRepository.save(newProduct);
  }
}

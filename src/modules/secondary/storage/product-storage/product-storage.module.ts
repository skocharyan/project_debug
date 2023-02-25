import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductStorageService } from './product-storage.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductStorageService],
  exports: [ProductStorageService]
})
export class ProductStorageModule {}

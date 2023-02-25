import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './subscription.entity';
import { SubscriptionStorageService } from './subscription-storage.service';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription])],
  providers: [SubscriptionStorageService],
  exports: [SubscriptionStorageService]
})
export class SubscriptionStorageModule {}

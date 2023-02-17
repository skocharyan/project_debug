import { Module } from '@nestjs/common';
import { UserApiModule } from './user/user-api.module';
import { PaymentModule } from './payments/payment.module';

@Module({
  imports: [UserApiModule, PaymentModule]
})
export class EasyvslApiModule {}

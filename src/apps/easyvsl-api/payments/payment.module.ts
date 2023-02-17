import { Module } from '@nestjs/common';
import { PayKickstartGatewayController } from './gateways/paykickstart/pay-kickstart-gateway.controller';
import { UserApiModule } from '../user/user-api.module';
import { PayKickstartEventsHandlerService } from './purchases/events-handler/pay-kickstart-events-handler.service';

@Module({
  imports: [UserApiModule],
  controllers: [PayKickstartGatewayController],
  providers: [PayKickstartEventsHandlerService]
})
export class PaymentModule {}

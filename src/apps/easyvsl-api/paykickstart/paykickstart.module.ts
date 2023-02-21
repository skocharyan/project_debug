import { Module } from '@nestjs/common';
import { PaykickstartController } from './paykickstart.controller';
import { UserApiModule } from '../user/user-api.module';
import { PaykickstartService } from './paykickstart.service';

@Module({
  imports: [UserApiModule],
  controllers: [PaykickstartController],
  providers: [PaykickstartService]
})
export class PaykickstartModule {}

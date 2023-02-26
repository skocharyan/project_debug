import { Module } from '@nestjs/common';
import { UserApiModule } from '../user/user-api.module';
import { PaykickstartController } from './paykickstart.controller';
import { PaykickstartService } from './paykickstart.service';
@Module({
  imports: [UserApiModule],
  controllers: [PaykickstartController],
  providers: [PaykickstartService]
})
export class PaykickstartModule {}

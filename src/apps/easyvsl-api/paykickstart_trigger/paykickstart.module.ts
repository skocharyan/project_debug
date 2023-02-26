import { Module } from '@nestjs/common';
import { HttpModule } from '@modules/secondary/api/http/http.module';
import { PaykickstartTriggerService } from './paykickstart.trigger.service';

@Module({
  imports: [
    HttpModule.register({
      baseUrl: '',
      timeout: 5000,
      keepAlive: false
    })
  ],
  providers: [PaykickstartTriggerService],
  exports: [PaykickstartTriggerService]
})
export class PaykickstartTriggerModule {}

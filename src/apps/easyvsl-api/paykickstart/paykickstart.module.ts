import { Module } from '@nestjs/common';
import { PaykickstartController } from './paykickstart.controller';
import { UserApiModule } from '../user/user-api.module';
import { PaykickstartService } from './paykickstart.service';
import { HttpModule } from '@modules/secondary/api/http/http.module';

@Module({
  imports: [
    UserApiModule,
    HttpModule.register({
      baseUrl: '',
      timeout: 5000,
      keepAlive: false
    })
  ],
  controllers: [PaykickstartController],
  providers: [PaykickstartService]
})
export class PaykickstartModule {}

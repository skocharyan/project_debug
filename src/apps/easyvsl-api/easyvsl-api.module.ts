import { Module } from '@nestjs/common';
import { UserApiModule } from './user/user-api.module';
import { PaykickstartModule } from './paykickstart/paykickstart.module';

@Module({
  imports: [UserApiModule, PaykickstartModule]
})
export class EasyvslApiModule {}

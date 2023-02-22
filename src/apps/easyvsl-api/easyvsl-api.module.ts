import { Module } from '@nestjs/common';
import { UserApiModule } from './user/user-api.module';
import { PaykickstartModule } from './paykickstart/paykickstart.module';
import { AuthApiModule } from './auth/auth-api.module';

@Module({
  imports: [UserApiModule, PaykickstartModule, AuthApiModule]
})
export class EasyvslApiModule {}

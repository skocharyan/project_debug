import { Body, Controller, Patch } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthPasswordResetRequest } from './models/password-reset.request';
import { AuthApiService } from './auth-api.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthApiController {
  constructor(private readonly authApiService: AuthApiService) {}

  @Patch('change-password')
  @ApiOkResponse({
    description: 'Password reset'
  })
  @ApiBody({
    description: 'User reset password',
    type: AuthPasswordResetRequest,
    required: true
  })
  async resetUserPassword(
    @Body() payload: AuthPasswordResetRequest
  ): Promise<{ msg: string }> {
    return this.authApiService.resetPassword(payload);
  }
}

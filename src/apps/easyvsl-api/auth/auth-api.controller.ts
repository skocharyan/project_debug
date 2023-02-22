import { Body, Controller, HttpCode, HttpStatus, Patch } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthPasswordResetRequest } from './models/password-reset.request';
import { AuthApiService } from './auth-api.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthApiController {
  constructor(private readonly authApiService: AuthApiService) {}

  @Patch('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Password reset'
  })
  @ApiBody({
    description: 'User reset password',
    type: AuthPasswordResetRequest,
    required: true
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User update password successfully'
  })
  async resetPassword(
    @Body() passwordResetRequest: AuthPasswordResetRequest
  ): Promise<void> {
    await this.authApiService.resetPassword(passwordResetRequest);
  }
}

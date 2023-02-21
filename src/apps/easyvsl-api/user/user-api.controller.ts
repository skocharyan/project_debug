import { Body, Controller, Post } from '@nestjs/common';
import { UserApiService } from './user-api.service';
import { SignUpRequest } from './models';

@Controller('user')
export class UserApiController {
  constructor(private readonly userService: UserApiService) {}

  @Post('signup')
  async signup(@Body() payload: SignUpRequest): Promise<any> {
    return this.userService.userCreate(payload);
  }
}

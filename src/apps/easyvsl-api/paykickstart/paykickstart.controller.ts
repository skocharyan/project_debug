import { Body, Controller, ForbiddenException, Post } from '@nestjs/common';
import { PaykickstartService } from './paykickstart.service';
import { TPayKickstartEventsHandleEventPayload } from './common/types/types';
import { config } from '@config/config';
import { validatePayKickstartIpn } from './common/utils/validate-ipn.utils';

@Controller('paykickstart')
export class PaykickstartController {
  constructor(
    private readonly payKickstartEventsHandler: PaykickstartService
  ) {}

  @Post('/events')
  async handleEvent(
    @Body() payload: TPayKickstartEventsHandleEventPayload
  ): Promise<void> {
    const payKickstartSecretKey = config.paykickstart.secret_key;

    const isValidPayload = validatePayKickstartIpn(
      payload,
      payKickstartSecretKey
    );

    if (!isValidPayload) {
      throw new ForbiddenException();
    }

    await this.payKickstartEventsHandler.handleEvent(
      payload as TPayKickstartEventsHandleEventPayload
    );
  }
}

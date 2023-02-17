import { Body, Controller, ForbiddenException, Post } from '@nestjs/common';
import { PayKickstartEventsHandlerService } from '../../purchases/events-handler/pay-kickstart-events-handler.service';
import { TPayKickstartEventsHandleEventPayload } from '../../purchases/events-handler/types';
import { config } from '@config/config';
import { validatePayKickstartIpn } from './common/validate-ipn.utility';

@Controller('paykickstart')
export class PayKickstartGatewayController {
  constructor(
    private payKickstartEventsHandler: PayKickstartEventsHandlerService
  ) {}

  @Post('/events')
  async handleEvent(@Body() payload): Promise<void> {
    const payKickstartSecretKey = config.paykickstart.secret_key;

    // TODO It need to be changed
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

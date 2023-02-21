import { Body, Controller, Post } from '@nestjs/common';
import { PaykickstartService } from './paykickstart.service';
import { TPayKickstartEventsHandleEventPayload } from './common/types/types';
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
    validatePayKickstartIpn(payload);

    await this.payKickstartEventsHandler.handleEvent(
      payload as TPayKickstartEventsHandleEventPayload
    );
  }
}

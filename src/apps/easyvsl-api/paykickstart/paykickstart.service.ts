import { BadRequestException, Injectable } from '@nestjs/common';
import {
  TPayKickstartEventsHandleEventPayload,
  TPayKickstartEventsHandler
} from './common/types/types';
import { PayKickstartIPNEvent } from './common/enums/paykickstart.enum';
import { UserApiService } from '../user/user-api.service';

@Injectable()
export class PaykickstartService {
  eventHandlersMap: Partial<
    Record<PayKickstartIPNEvent, TPayKickstartEventsHandler>
  > = {
    [PayKickstartIPNEvent.subscriptionPayment]:
      this.onSubscriptionPaidEvent.bind(this)
  };

  constructor(private readonly userApiService: UserApiService) {}

  async handleEvent(
    payload: TPayKickstartEventsHandleEventPayload
  ): Promise<void> {
    const handler = this.eventHandlersMap[payload.event];

    if (!handler) {
      return;
    }

    await handler({ payload });
  }

  protected async onSubscriptionPaidEvent({
    payload
  }: {
    payload: TPayKickstartEventsHandleEventPayload;
  }): Promise<void> {
    const {
      buyer_first_name: firstName,
      buyer_last_name: lastName,
      buyer_email: email
    } = payload;

    const createdUser = await this.userApiService.userCreate({
      firstName,
      lastName,
      email
    });

    if (!createdUser) {
      throw new BadRequestException();
    }
  }
}

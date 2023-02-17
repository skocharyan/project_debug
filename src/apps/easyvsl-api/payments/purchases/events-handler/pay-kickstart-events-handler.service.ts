import { Injectable } from '@nestjs/common';
import {
  TPayKickstartEventsHandleEventPayload,
  TPayKickstartEventsHandler
} from './types';
import { PayKickstartIPNEvent } from '../../gateways/paykickstart/common/enums';
import { UserApiService } from '../../../user/user-api.service';

@Injectable()
export class PayKickstartEventsHandlerService {
  eventHandlersMap: Partial<
    Record<PayKickstartIPNEvent, TPayKickstartEventsHandler>
  > = {
    [PayKickstartIPNEvent.subscriptionPayment]:
      this.onSubscriptionPaidEvent.bind(this)
  };

  constructor(private userApiService: UserApiService) {}

  async handleEvent(
    payload: TPayKickstartEventsHandleEventPayload
  ): Promise<void> {
    const handler = this.eventHandlersMap[payload.event];

    if (!handler) {
      return;
    }

    return handler({ payload });
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

    await this.userApiService.userCreate({ firstName, lastName, email });
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import {
  ISubscriptionCancellationResponse,
  ISubscriptionChangeResponse,
  TPayKickstartEventsHandleEventPayload,
  TPayKickstartEventsHandler
} from './common/types/types';
import { PayKickstartIPNEvent } from './common/enums/paykickstart.enum';
import { UserApiService } from '../user/user-api.service';
import { HttpClient } from '@modules/secondary/api/http/http.service';
import { config } from '@config/config';
import { AxiosRequestConfig } from 'axios';
@Injectable()
export class PaykickstartService {
  private vendorKey: string;

  eventHandlersMap: Partial<
    Record<PayKickstartIPNEvent, TPayKickstartEventsHandler>
  > = {
    [PayKickstartIPNEvent.subscriptionPayment]:
      this.onSubscriptionPaidEvent.bind(this)
  };

  constructor(
    private readonly userApiService: UserApiService,
    private readonly httpClient: HttpClient
  ) {}

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

  async change(
    productId: number,
    invoiceId: string
  ): Promise<ISubscriptionChangeResponse> {
    const endpoint = config.paykickstart.subscription_change_url;
    const requestConfig: AxiosRequestConfig = {
      headers: {
        contentType: 'application/json'
      }
    };
    const data = {
      auth_token: this.vendorKey,
      invoiceId,
      productId
    };
    const response = await this.httpClient.post<ISubscriptionChangeResponse>(
      endpoint,
      data,
      requestConfig
    );
    const status = response.status;

    if (status !== 200) {
      throw new BadRequestException();
    }

    return response.data;
  }

  async cancel(invoice_id: string): Promise<ISubscriptionCancellationResponse> {
    const endpoint = config.paykickstart.subscription_cancellation_url;
    const requestConfig: AxiosRequestConfig = {
      headers: {
        contentType: 'application/json'
      }
    };
    const data = {
      auth_token: this.vendorKey,
      invoice_id
    };

    const response =
      await this.httpClient.post<ISubscriptionCancellationResponse>(
        endpoint,
        data,
        requestConfig
      );

    const status = response.status;

    if (status !== 200) {
      throw new BadRequestException();
    }

    return response.data;
  }
}

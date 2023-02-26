import { Injectable } from '@nestjs/common/decorators';
import { config } from '@config/config';
import {
  ISubscriptionCancellationResponse,
  ISubscriptionChangeResponse
} from './common/types/types';
import { AxiosRequestConfig } from 'axios';
import { HttpClient } from '@modules/secondary/api/http/http.service';
import { BadRequestException } from '@nestjs/common';
@Injectable()
export class PaykickstartTriggerService {
  private vendorKey;

  constructor(private readonly httpClient: HttpClient) {
    this.vendorKey = config.paykickstart.secret_key;
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

  async cancel(invoiceId: string): Promise<ISubscriptionCancellationResponse> {
    const endpoint = config.paykickstart.subscription_cancellation_url;
    const requestConfig: AxiosRequestConfig = {
      headers: {
        contentType: 'application/json'
      }
    };
    const data = {
      auth_token: this.vendorKey,
      invoiceId
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

import { Injectable } from '@nestjs/common';
import { HttpService as AxiosHttpService } from '@nestjs/axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HttpClient {
  constructor(private readonly innerClient: AxiosHttpService) {}

  async post<T>(
    url: string,
    data?: Record<string | number, unknown> | Array<unknown>,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return firstValueFrom(this.innerClient.post<T>(url, data, config));
  }

  async get<T>(
    url: string,
    data?: Record<string | number, unknown>
  ): Promise<AxiosResponse<T>> {
    return firstValueFrom(this.innerClient.get<T>(url, { params: data }));
  }

  async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return firstValueFrom(this.innerClient.delete<T>(url, config));
  }
}

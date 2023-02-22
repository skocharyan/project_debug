import { AxiosRequestHeaders } from 'axios';

export type HttpClientParams = {
  baseUrl: string;
  timeout: number;
  keepAlive: boolean;
  headers?: AxiosRequestHeaders;
};

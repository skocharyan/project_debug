import { DynamicModule, Module } from '@nestjs/common';
import { HttpModule as AxiosModule, HttpService } from '@nestjs/axios';
import http from 'http';
import { HttpClientParams } from './types/http.type';
import { HttpClient } from './http.service';

@Module({})
export class HttpModule {
  static register(params: HttpClientParams): DynamicModule {
    return {
      imports: [
        AxiosModule.register({
          baseURL: params.baseUrl,
          timeout: params.timeout,
          httpAgent: params.keepAlive
            ? new http.Agent({ keepAlive: true })
            : undefined,
          headers: params.headers
        })
      ],
      providers: [
        {
          provide: HttpClient,
          useFactory: (axiosService: HttpService) =>
            new HttpClient(axiosService),
          inject: [HttpService]
        }
      ],
      exports: [HttpClient],
      module: HttpModule
    };
  }
}

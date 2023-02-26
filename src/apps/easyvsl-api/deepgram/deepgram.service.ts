import { BadRequestException, Injectable } from '@nestjs/common';
import { config } from '@config/config';

import { AxiosRequestConfig } from 'axios';
import { HttpClient } from '@modules/secondary/api/http/http.service';
import {
  IDeepGramCreateResponse,
  IReturnKey
} from './models/deepgram.response';

@Injectable()
export class DeepGramService {
  private deepGramKey;

  private projectId;

  constructor(private httpClient: HttpClient) {
    this.deepGramKey = config.deepGram.key;
    this.deepGramKey = config.deepGram.project_id;
  }

  async createKey(comment: string, scope: string[] = []): Promise<IReturnKey> {
    const deepGramBaseUrl = config.deepGram.baseUrl;
    const endpoint =
      deepGramBaseUrl + `${this.projectId}/keys/${this.deepGramKey}`;

    const createConfig: AxiosRequestConfig = {
      headers: {
        Authorization: this.deepGramKey,
        contentType: 'application/json'
      }
    };
    const data = { comment, scope };

    const response = await this.httpClient.post<IDeepGramCreateResponse>(
      endpoint,
      data,
      createConfig
    );
    const statusCode = response.status;
    const key = response.data.key;
    const keyId = response.data.api_key_id;

    if (statusCode !== 201 && key) {
      throw new BadRequestException();
    }

    return { keyId, key };
  }

  async deleteKey(keyId: string): Promise<boolean> {
    const deepGramBaseUrl = config.deepGram.baseUrl;
    const endpoint = deepGramBaseUrl + this.projectId + '/keys/' + keyId;

    const delConfig: AxiosRequestConfig = {
      headers: {
        Authorization: this.deepGramKey,
        contentType: 'application / json'
      }
    };
    const response = await this.httpClient.delete<IDeepGramCreateResponse>(
      endpoint,
      delConfig
    );
    const statusCode = response.status;

    if (statusCode == 200) {
      return true;
    } else {
      throw new BadRequestException();
    }
  }
}

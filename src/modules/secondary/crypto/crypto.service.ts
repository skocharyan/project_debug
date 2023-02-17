import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';

import { HASH_ROUNDS_QTY } from '@modules/secondary/crypto/constants';

@Injectable()
export class CryptoService {
  constructor() {}

  async hash(value: string, rounds?: number): Promise<string> {
    return bcrypt.hash(value, rounds || HASH_ROUNDS_QTY);
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }

  async generateRandomPassword(
    length: number
  ): Promise<Record<string, string>> {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.!@#$%^&*';
    const bytes = crypto.randomBytes(length);
    const result = new Array(length);

    for (let i = 0; i < length; i++) {
      result[i] = chars[bytes[i] % chars.length];
    }

    const randomGenPassword = result.join('');

    const hashedPassword = await this.hash(randomGenPassword);

    return { randomGenPassword, hashedPassword };
  }
}

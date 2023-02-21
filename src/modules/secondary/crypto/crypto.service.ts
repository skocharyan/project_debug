import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';

import {
  HASH_ROUNDS_QTY,
  RANDOM_GEN_CHARS
} from '@modules/secondary/crypto/constants';

@Injectable()
export class CryptoService {
  async hash(value: string, rounds?: number): Promise<string> {
    return bcrypt.hash(value, rounds || HASH_ROUNDS_QTY);
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }

  async generatedPassword(length: number = HASH_ROUNDS_QTY): Promise<string> {
    const chars = RANDOM_GEN_CHARS;
    const bytes = crypto.randomBytes(length);
    const result = new Array(length);

    for (let i = 0; i < length; i++) {
      result[i] = chars[bytes[i] % chars.length];
    }

    return result.join('');
  }
}

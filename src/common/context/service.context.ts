import * as cls from 'cls-hooked';

import type { Identity } from '../types/identity.type';

export const SERVICE_CONTEXT_KEY = '__SERVICE_CONTEXT__';
export const CORRELATION_ID_KEY = 'correlationId';

export class ServiceContext {
  constructor(
    public readonly identity: Identity | null,
    public readonly correlationId: string | null
  ) {}

  static get current(): ServiceContext {
    const session = cls.getNamespace(SERVICE_CONTEXT_KEY);

    if (session && session.active) {
      return session.get(ServiceContext.name);
    }

    return new ServiceContext(null, null);
  }
}

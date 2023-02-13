import { Logger } from '@nestjs/common';
import { safeObject } from '../utils';

export interface INestLogger {
  info: (data: any) => void;
  error: (data: any) => void;
  name?: string;
}

export interface INestInternalLogger {
  info: (msg: string, data?: Record<string, any>) => void;
  error: (msg: string, data?: Record<string, any>) => void;
}

export const prepareLogger = (
  localLogger: Logger,
  context: string,
  externalLogger?: INestLogger
): INestInternalLogger => {
  const logger = externalLogger ?? {
    info: (data) => {
      localLogger.log(data);
    },
    error: (data) => {
      const err = data?.err ?? data?.error;
      localLogger.error(
        safeObject({
          ...data,
          err:
            err && err instanceof Error
              ? {
                  type: err?.name,
                  message: err?.message,
                  stack: err?.stack
                }
              : err ?? null
        })
      );
    }
  };

  return {
    info: (msg: string, data?: Record<string, any>) => {
      logger.info({
        msg,
        context,
        ...data
      });
    },
    error: (msg: string, data?: Record<string, any>) => {
      logger.error({
        msg,
        context,
        ...data
      });
    }
  };
};

import pino from 'pino';

import { ILogger } from './types';

const logLevel = process.env.LOG_LEVEL || 'debug';

export const logger: ILogger = pino({
  level: logLevel,
  formatters: {
    level: (label) => {
      return { level: label };
    }
  },
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  }
});

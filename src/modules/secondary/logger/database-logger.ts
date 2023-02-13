import { Logger as TypeDbLogger } from 'typeorm';

import { isTest } from '@config/environment';
import { logger } from './index';

export class DatabaseLogger implements TypeDbLogger {
  private logger = logger.child({ service: 'DB' });

  private static stringify(data: unknown): unknown {
    try {
      return JSON.stringify(data);
    } catch (error) {
      // most probably circular objects in parameters
      return data;
    }
  }

  log(level: 'log' | 'info' | 'warn', message: string): void {
    if (level === 'log') {
      level = 'info';
    }

    this.logger[level](`Database: ${message}`);
  }

  logQuery(query: string, parameters?: unknown[]): void {
    this.logger.trace(
      {
        query: query.replace(/"/g, ''),
        parameters:
          parameters && parameters.length
            ? DatabaseLogger.stringify(parameters)
            : null
      },
      'Database query'
    );
  }

  logQueryError(err: string, query: string, parameters?: unknown[]): void {
    this.logger.error(
      {
        query,
        err,
        parameters:
          parameters && parameters.length
            ? DatabaseLogger.stringify(parameters)
            : null
      },
      'Database query error'
    );
  }

  logQuerySlow(time: number, query: string, parameters?: unknown[]): void {
    this.logger.warn(
      {
        query,
        time,
        parameters:
          parameters && parameters.length
            ? DatabaseLogger.stringify(parameters)
            : null
      },
      'Database long query'
    );
  }

  logSchemaBuild(message: string): void {
    if (isTest()) return;

    this.logger.info(`Database schema build: ${message}`);
  }

  logMigration(message: string): void {
    this.logger.info(`Database migration: ${message}`);
  }
}

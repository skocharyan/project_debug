/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoggerService } from '@nestjs/common';
import { logger } from '.';

export class NestLogger implements LoggerService {
  log(message: string, context?: string): void {
    logger.info({ msg: this.getMessage(message, context) });
  }

  error(message: string, trace?: string, context?: string): void {
    logger.error({ msg: this.getMessage(message, context), trace });
  }

  warn(message: string, context?: string): void {
    logger.warn({ msg: this.getMessage(message, context) });
  }

  debug?(message: string, context?: string): void {
    logger.debug({ msg: this.getMessage(message, context) });
  }

  verbose?(message: string, context?: string): void {
    logger.trace({ msg: this.getMessage(message, context) });
  }

  private getMessage(message: string, context?: string): string {
    if (!context) return message;

    return `${context}: ${message}`;
  }
}

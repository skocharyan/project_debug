// eslint-disable-next-line max-classes-per-file
import type { ErrorCode } from './error-codes';

const ERROR_PEFIX = 'ERR';
const UNKNOWN_ERROR = 500;

export const getCodeByHttpStatus = (status: number): string =>
  `${ERROR_PEFIX}${status}`;

export const getHttpStatus = (errorCode: string): number => {
  if (!errorCode.includes(ERROR_PEFIX)) {
    return UNKNOWN_ERROR;
  }

  const status: string = errorCode.replace(ERROR_PEFIX, '');

  if (status.length < 3) {
    return UNKNOWN_ERROR;
  }

  const normilizedStatus = status.slice(0, 3);

  return Number.parseInt(normilizedStatus, 10);
};

export enum ExceptionSourceType {
  Application = 'application',
  QueryHandler = 'query-handler'
}

export class ApplicationException extends Error {
  private errorCode: ErrorCode;

  public readonly sourceType: ExceptionSourceType | string =
    ExceptionSourceType.Application;

  constructor(
    errorCode: ErrorCode,
    public message: string,
    public silence: boolean = false,
    public details?: any,
    public reason?: any
  ) {
    super();
    this.errorCode = errorCode;
  }

  public getErrorCode(): string {
    return this.errorCode.code;
  }

  public getHttpStatus(): number {
    return getHttpStatus(this.getErrorCode());
  }
}

export class IntegrationException extends ApplicationException {
  constructor(
    errorCode: ErrorCode,
    public message: string,
    public readonly sourceType: ExceptionSourceType | string,
    public details?: any,
    public reason?: any
  ) {
    super(errorCode, message, true, details, reason);
    this.sourceType = sourceType;
  }
}

export class PassiveException extends ApplicationException {
  constructor(
    errorCode: ErrorCode,
    public message: string,
    public details?: any,
    public reason?: any
  ) {
    super(errorCode, message, true, details, reason);
  }
}

export class ActiveException extends ApplicationException {
  constructor(
    errorCode: ErrorCode,
    public message: string,
    public details?: any,
    public reason?: any
  ) {
    super(errorCode, message, false, details, reason);
  }
}

export class QueryHandlerException extends ActiveException {
  public readonly sourceType: ExceptionSourceType =
    ExceptionSourceType.QueryHandler;

  constructor(
    errorCode: ErrorCode,
    public message: string,
    public queryType: string,
    public queryData: string,
    public reason?: any
  ) {
    super(errorCode, message, queryData, reason);
  }
}

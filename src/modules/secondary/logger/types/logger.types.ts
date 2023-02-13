type Level = 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace';
type SerializerFn = (value: unknown) => unknown;

interface IBindings {
  [key: string]: unknown;
  level?: Level | string | undefined;
  serializers?: { [key: string]: SerializerFn } | undefined;
}

interface ILogFn {
  <T extends Record<string, unknown>>(
    obj: T,
    msg?: string,
    ...args: unknown[]
  ): void;
  (msg: string, ...args: unknown[]): void;
}

export interface ILogger {
  fatal: ILogFn;
  error: ILogFn;
  warn: ILogFn;
  info: ILogFn;
  debug: ILogFn;
  trace: ILogFn;
  silent: ILogFn;

  /**
   * Creates a child logger, setting all key-value pairs in `bindings` as properties in the log lines. All serializers will be applied to the given pair.
   * Child loggers use the same output stream as the parent and inherit the current log level of the parent at the time they are spawned.
   * If a `level` property is present in the object passed to `child` it will override the child logger level.
   *
   * @param bindings: an object of key-value pairs to include in log lines as properties.
   * @returns a child logger instance.
   */
  child(bindings: IBindings): ILogger;
}

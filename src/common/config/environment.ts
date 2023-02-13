export const getEnvironment = (): string =>
  process.env.NODE_ENV || 'development';
export const isProd = (): boolean => getEnvironment() === 'production';
export const isTest = (): boolean => getEnvironment() === 'test';
export const isDev = (): boolean => getEnvironment() === 'development';

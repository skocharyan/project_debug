import { INestLogger } from './types/logger';
import { Logger } from '@nestjs/common';

export interface INestConfigParams {
  files?: string[];
  schema: Record<string, any>;
  logger?: INestLogger;
  envVersionSuffix?: string;
  envVersionDepthSuffix?: number;
}

export const NEST_CONFIG_LOGGER_NAME = 'ConfigModule';
export const ConfigLocalLogger = new Logger(NEST_CONFIG_LOGGER_NAME);

export const DEFAULT_CONFIG_META_PATH = 'path';
export const DEFAULT_CONFIG_META_ENV_VERSION_SUFFIX_DEFAULT = 'VRX';
export const DEFAULT_CONFIG_META_ENV_VERSION_DEPTH_SUFFIX_DEFAULT = 10;

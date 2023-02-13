import * as nconf from 'nconf';
import { Provider } from 'nconf';
import * as nconfYaml from 'nconf-yaml';
import * as fs from 'fs';
import { isSafe } from './utils';
import { INestInternalLogger } from './types/logger';

export let cfg: Provider = nconf?.argv().env();

export const initProvider = () => {
  cfg = nconf.argv().env();
};

export const applyFile = async (
  fileName: string,
  logger: INestInternalLogger
) => {
  try {
    const stat = fs.statSync(fileName);

    if (stat && stat.isFile()) {
      logger.info('Init config file', {
        fileName
      });
      cfg.file(fileName, {
        file: fileName,
        format: nconfYaml
      });
    } else {
      logger.error('Cannot read file', {
        fileName
      });
    }
  } catch (err) {
    logger.error('Cannot read file', {
      fileName,
      err
    });
  }
};

export function transformPathFromDotToEnv(path: string) {
  return path
    .split('.')
    .map((p) => `${p}`.toUpperCase())
    .join('_');
}

/**
 * For nconf, delimiter dot.
 */
export function cfgGet(key: string) {
  if (!isSafe(key)) return null;

  return cfg.get(key.split(':').join('.').split('.').join(':'));
}

/**
 * Get any value from ENV or config file.
 *
 * Example, { path: 'chain_56.web.rpc'  } transform to 'CHAIN_56_WEB_RPC'.
 */
/**
 * Get any value from ENV or config file.
 *
 * Example, { path: 'chain_56.web.rpc'  } transform to 'CHAIN_56_WEB_RPC'.
 */
export function getConfigValue(path: string): any {
  return cfg.get(transformPathFromDotToEnv(path)) ?? cfgGet(path) ?? null;
}

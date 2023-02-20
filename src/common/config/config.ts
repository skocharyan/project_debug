import * as path from 'path';
import { getNestConfig, initNestConfig } from '@common/config-schemas';
import { JTDDataType } from 'ajv/dist/types/jtd-schema';
import { logger } from '@modules/secondary/logger';
import { AppSchema } from './schemas';
import { DatabaseSchema } from '@config/schemas/database.shema';
import { JwtSchema } from './schemas/jwt.schema';

const configFolder = path.join(
  process.cwd(),
  './config/',
  process.env.CONFIG_PROFILE || './'
);

const configFiles = ['./config.yml', './database.yml'].map((file) => {
  return path.resolve(configFolder, file);
});

initNestConfig({
  files: configFiles,
  logger
});

export const ConfigScheme = {
  properties: {
    app: AppSchema,
    database: DatabaseSchema,
    jwt: JwtSchema
  }
} as const;

export type CommonConfig = JTDDataType<typeof ConfigScheme>;
export type Config = CommonConfig;
export const config: Config = {
  ...(getNestConfig({
    schema: ConfigScheme
  }) as Config)
};

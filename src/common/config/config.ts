import * as path from 'path';
import { getNestConfig, initNestConfig } from '@common/config-schemas';
import { JTDDataType } from 'ajv/dist/types/jtd-schema';
import { logger } from '@modules/secondary/logger';
import { DatabaseSchema } from '@config/schemas/database.shema';
import { JwtSchema } from './schemas/jwt.schema';
import { DeepGramSchema } from './schemas/deepgram.schema';
import { AppSchema, DatabaseSchema, PayKickStartSchema } from './schemas';
import { SwaggerSchema } from '@config/schemas/swagger.shema';
import { PostmarkSchema } from '@config/schemas/mail.schema';

const configFolder = path.join(
  process.cwd(),
  './config/',
  process.env.CONFIG_PROFILE || './'
);

const configFiles = ['./config.yml', './database.yml', './payments.yml'].map(
  (file) => {
    return path.resolve(configFolder, file);
  }
);

initNestConfig({
  files: configFiles,
  logger
});

export const ConfigScheme = {
  properties: {
    app: AppSchema,
    database: DatabaseSchema,
    jwt: JwtSchema,
    deepGram: DeepGramSchema
    paykickstart: PayKickStartSchema,
    swagger: SwaggerSchema,
    postmark: PostmarkSchema
  }
} as const;

export type CommonConfig = JTDDataType<typeof ConfigScheme>;
export type Config = CommonConfig;
export const config: Config = {
  ...(getNestConfig({
    schema: ConfigScheme
  }) as Config)
};

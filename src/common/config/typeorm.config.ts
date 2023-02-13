import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as ms from 'ms';
import { join } from 'path';

import { DatabaseLogger } from '@modules/secondary/logger/database-logger';
import { logger } from '@modules/secondary/logger';
import { config } from './config';

const databaseLogger = new DatabaseLogger();

const poolErrorHandler = (err: Error): void => {
  logger.error({ err }, 'Database pool error');
};

const ORM_CONFIG: TypeOrmModuleOptions = {
  type: 'postgres',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  entities: [
    join(__dirname, '../../modules/secondary/storage/**/', '*.entity.{ts,js}')
  ],
  migrations: [join(__dirname, '../../orm/migrations/*.ts')],
  ssl: config.database.ssl,
  extra: config.database.ssl ? { ssl: { rejectUnauthorized: false } } : {},
  synchronize: config.database.synchronize,
  logging: config.database.logging,
  migrationsRun: config.database.migrations,
  poolErrorHandler,
  logger: databaseLogger,
  maxQueryExecutionTime: ms('1s'),
  namingStrategy: new SnakeNamingStrategy()
};

export = ORM_CONFIG;

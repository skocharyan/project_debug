export const DatabaseSchema = {
  properties: {
    host: { type: 'string' },
    port: { type: 'int32' },
    username: { type: 'string' },
    password: { type: 'string' },
    database: { type: 'string' },
    ssl: { type: 'boolean' },
    migrations: { type: 'boolean' },
    logging: { type: 'boolean' },
    synchronize: { type: 'boolean' }
  }
} as const;

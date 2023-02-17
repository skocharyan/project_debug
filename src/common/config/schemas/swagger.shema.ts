export const SwaggerSchema = {
  properties: {
    global_prefix: { type: 'string' },
    path: { type: 'string' },
    title: { type: 'string' },
    description: { type: 'string' },
    version: { type: 'string' }
  }
} as const;

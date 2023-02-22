export const JwtSchema = {
  properties: {
    secret: { type: 'string' },
    expires_in: { type: 'int32' }
  }
} as const;

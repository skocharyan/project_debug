import { AppEnum } from '@config/app.enum';

export const EasyvslSchema = {
  properties: {
    port: { type: 'int32' }
  }
} as const;

export const AppSchema = {
  properties: {
    name: { enum: Object.values(AppEnum) },
    web_url: { type: 'string' },
    easyvsl_api: EasyvslSchema
  }
} as const;

import { config } from '@config/config';

export function buildEmailTemplateUrl(): string {
  return `${config.app.web_url}/change-password?page=reset`;
}

export const PayKickStartSchema = {
  properties: {
    secret_key: { type: 'string' },
    subscription_change_url: { type: 'string' },
    subscription_cancellation_url: { type: 'string' }
  }
} as const;

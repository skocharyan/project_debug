import { TSendEmailVerification } from '@modules/secondary/mail/type';

export type MailOptions = {
  to: string;
  subject: string;
  context: TSendEmailVerification;
};

import { BadRequestException, Injectable } from '@nestjs/common';
import { Client } from 'postmark';
import {
  TSendEmailOptions,
  TSendEmailVerification
} from '@modules/secondary/mail/type';
import { MailOptions } from '@modules/secondary/mail/common/types';
import { config } from '@config/config';
import { MessageSendingResponse } from 'postmark/dist/client/models';
import {
  FROM_SENDER,
  MAIL_SUBJECT
} from '@modules/secondary/mail/common/constants/mail.constants';

@Injectable()
export class PostmarkService {
  private readonly client: Client;

  constructor() {
    this.client = new Client(config.postmark.api_token);
  }

  async sendEmailVerification(
    context: TSendEmailVerification,
    sendMailOptions: TSendEmailOptions
  ): Promise<MessageSendingResponse> {
    const { to } = sendMailOptions;

    return this.sendMail({
      to,
      subject: MAIL_SUBJECT,
      context
    });
  }

  private async sendMail(
    options: MailOptions
  ): Promise<MessageSendingResponse> {
    const { to, subject, context } = options;

    if (!to || !subject) {
      throw new BadRequestException();
    }

    try {
      return await this.client.sendEmail({
        To: to,
        Subject: subject,
        From: FROM_SENDER,
        TextBody: `Hello Dear ${context.userFirstName} to the EasyVSL. You password is: ${context.password}.\n You need to go to this link ${context.link}}`
      });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}

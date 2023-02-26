import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserStorageService } from '@modules/secondary/storage/user-storage/user-storage.service';
import { User } from '@modules/secondary/storage/user-storage/user.entity';
import { CryptoService } from '@modules/secondary/crypto/crypto.service';
import { CreateUserInput, SignUpRequest } from './models';
import { PostmarkService } from '@modules/secondary/mail/postmark.service';
import { buildEmailTemplateUrl } from './common/utils/url.utils';
import { MessageSendingResponse } from 'postmark/dist/client/models';
import { SendEmailInput } from './models/sendEmailInput';
import { TAtLeastOneRequired } from '@common/types/utils/types';

import { Subscription } from '@modules/secondary/storage/subscription-storage/subscription.entity';
import { DeepGramService } from '../deepgram/deepgram.service';
import { DeepgramStorageService } from '@modules/secondary/storage/deepgram-storage/deepgram-storage.service';
import { PaykickstartTriggerService } from '../paykickstart_trigger/paykickstart.trigger.service';
import {
  ISubscriptionCancellationResponse,
  ISubscriptionChangeResponse
} from '../paykickstart_trigger/common/types/types';

@Injectable()
export class UserApiService {
  constructor(
    private readonly userStorageService: UserStorageService,
    private readonly cryptoService: CryptoService,
    private readonly postmarkService: PostmarkService,
    private readonly paykickstartTriggerService: PaykickstartTriggerService,
    private readonly deepGramService: DeepGramService,
    private readonly deepGramStorageService: DeepgramStorageService
  ) {}

  async userCreate(payload: SignUpRequest): Promise<User> {
    const { email } = payload;
    let createdUser: User = {} as User;

    await this.userFindOneOrThrowException(email);

    // Generate random password
    const generatedRandomPassword =
      await this.cryptoService.generatingRandomPassword();
    // Generate DeepGram key and store in database
    const { keyId, key } = await this.deepGramService.createKey(email);
    const deepGramKey = await this.deepGramStorageService.createOne({
      keyId,
      key
    });

    createdUser = await this.createUser({
      ...payload,
      password: generatedRandomPassword,
      deepGram: deepGramKey
    });

    await this.sendGeneratedPasswordUserEmail({
      email: createdUser.email,
      userFirstName: createdUser.firstName,
      password: generatedRandomPassword
    });

    return createdUser;
  }

  private async userFindOneOrThrowException(email: string): Promise<User> {
    const userInDB = await this.userStorageService.findOne({ email });

    if (userInDB) {
      throw new ForbiddenException(email);
    }

    return userInDB;
  }

  private async createUser(user: CreateUserInput): Promise<User> {
    return this.userStorageService.createOne({
      ...user
    });
  }

  private async sendGeneratedPasswordUserEmail(
    userEmailData: SendEmailInput
  ): Promise<MessageSendingResponse> {
    const { email, userFirstName, password } = userEmailData;

    return this.postmarkService.sendEmailVerification(
      {
        link: buildEmailTemplateUrl(),
        userFirstName: userFirstName,
        password
      },
      {
        to: email
      }
    );
  }

  async cancelSubscription(
    currentUser: User
  ): Promise<ISubscriptionCancellationResponse> {
    const currentSubscription = currentUser.subscription;
    this.hasActiveSubscriptionOrThrowException(currentSubscription);
    const currentDate = new Date();
    const expireData = currentSubscription.expireDate;

    if (expireData < currentDate) {
      throw new ForbiddenException('The subscription is expired');
    }

    const invoiceId = currentSubscription.invoiceId;

    return await this.paykickstartTriggerService.cancel(invoiceId);
  }

  async downgrade(currentUser: User): Promise<ISubscriptionChangeResponse> {
    const currentSubscription = currentUser.subscription;
    this.hasActiveSubscriptionOrThrowException(currentSubscription);
    const { productId, productName } = currentSubscription.product;
    const invoiceId = currentSubscription.invoiceId;

    if (productName === 'Pro') {
      throw new ForbiddenException("You can't downgrade Pro plan");
    }

    return await this.paykickstartTriggerService.change(productId, invoiceId);
  }

  async upgrade(currentUser: User): Promise<ISubscriptionChangeResponse> {
    const currentSubscription = currentUser.subscription;
    this.hasActiveSubscriptionOrThrowException(currentSubscription);
    const { productId, productName } = currentSubscription.product;

    if (productName == 'Club') {
      throw new ForbiddenException('You already have the highest plan');
    }

    const invoiceId = currentSubscription.invoiceId;

    return this.paykickstartTriggerService.change(productId, invoiceId);
  }

  private hasActiveSubscriptionOrThrowException(
    currentSubscription: Subscription
  ): void {
    if (!currentSubscription) {
      throw new ForbiddenException('You do not have a valid subscription');
    }
  }

  async getUser(
    criteria: TAtLeastOneRequired<User>
  ): Promise<User | undefined> {
    return this.userStorageService.findOne(criteria);
  }
}

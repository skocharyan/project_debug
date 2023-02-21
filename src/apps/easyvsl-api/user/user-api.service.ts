import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserStorageService } from '@modules/secondary/storage/user-storage/user-storage.service';
import { User } from '@modules/secondary/storage/user-storage/user.entity';
import { CryptoService } from '@modules/secondary/crypto/crypto.service';
import { CreateUserInput, SignUpRequest } from './models';
import { PostmarkService } from '@modules/secondary/mail/postmark.service';
import { buildEmailTemplateUrl } from './common/utils/url.utils';
import { MessageSendingResponse } from 'postmark/dist/client/models';
import { SendEmailInput } from './models/sendEmailInput';

@Injectable()
export class UserApiService {
  constructor(
    private readonly userStorageService: UserStorageService,
    private readonly cryptoService: CryptoService,
    private readonly postmarkService: PostmarkService
  ) {}

  async userCreate(payload: SignUpRequest): Promise<User> {
    const { email } = payload;
    let createdUser: User = {} as User;

    await this.userFindOneOrThrowException(email);

    // Generate random password
    const generatedRandomPassword =
      await this.cryptoService.generatedPassword();

    createdUser = await this.createUser({
      ...payload,
      password: generatedRandomPassword
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
}

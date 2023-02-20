import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserStorageService } from '@modules/secondary/storage/user-storage/user-storage.service';
import { User } from '@modules/secondary/storage/user-storage/user.entity';
import { CryptoService } from '@modules/secondary/crypto/crypto.service';
import { SignUpRequest, CreateUserInput } from './models';

@Injectable()
export class UserApiService {
  constructor(
    private readonly userStorageService: UserStorageService,
    private readonly cryptoService: CryptoService
  ) {}

  async userCreate(payload: SignUpRequest): Promise<User> {
    const { email } = payload;
    let createdUser: User = {} as User;

    await this.userFindOneOrThrowException(email);

    // Generate random password
    const generatedRandomPassword =
      await this.cryptoService.generateRandomPassword();

    createdUser = await this.createUser({
      ...payload,
      password: generatedRandomPassword
    });

    // TODO Generate User Token for email
    // TODO Send mail with "randomGenPassword"

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
}

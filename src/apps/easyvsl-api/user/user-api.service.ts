import {
  BadRequestException,
  ForbiddenException,
  Injectable
} from '@nestjs/common';
import { UserStorageService } from '@modules/secondary/storage/user-storage/user-storage.service';
import { User } from '@modules/secondary/storage/user-storage/user.entity';
import { CryptoService } from '@modules/secondary/crypto/crypto.service';
import { CreateUserDto } from './common/dto';
import { UserDtoMapper } from './common/mappers';
import { UserDto } from '../common/dto/user.dto';
import { SignUpRequest } from './models/sign-up.request';

@Injectable()
export class UserApiService {
  constructor(
    private readonly userStorageService: UserStorageService,
    protected readonly cryptoService: CryptoService
  ) {}

  async userCreate(payload: SignUpRequest): Promise<UserDto> {
    const { email } = payload;
    let createdUser: User = {} as User;

    await this.userExistsOrThrowException(email);

    // Generate random password
    const { hashedPassword } = await this.cryptoService.generateRandomPassword(
      10
    );

    createdUser = await this.createUser({
      ...payload,
      password: hashedPassword
    });

    // TODO Generate User Token for email
    // TODO Send mail with "randomGenPassword"

    if (!createdUser) {
      throw new BadRequestException();
    }

    return UserDtoMapper.toBaseOutputDto(createdUser);
  }

  private async userExistsOrThrowException(email: string) {
    const userInDB = await this.userStorageService.findOne({ email });

    if (userInDB) {
      throw new ForbiddenException(email);
    }
  }

  private async createUser(user: CreateUserDto): Promise<User> {
    return this.userStorageService.createOne({
      ...user
    });
  }
}

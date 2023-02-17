import { UserType } from '../types';
import { UserDto } from '../../../common/dto/user.dto';

export class UserDtoMapper {
  static toBaseOutputDto(user: UserType): UserDto {
    return new UserDto({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      createdAt: user.createdAt
    });
  }
}

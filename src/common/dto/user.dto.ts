export class UserDto {
  constructor(data: UserDto) {
    Object.assign(this, data);
  }

  id: number;

  firstName: string;

  lastName: string;

  email: string;

  createdAt: Date;
}

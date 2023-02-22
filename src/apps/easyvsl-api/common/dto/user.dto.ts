export class UserOutput {
  constructor(data: UserOutput) {
    Object.assign(this, data);
  }

  id: number;

  firstName: string;

  lastName: string;

  email: string;

  createdAt: Date;
}

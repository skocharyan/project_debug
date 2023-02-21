import { IsEmail, IsString } from 'class-validator';

export class CreateUserInput {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  password: string;

  @IsString()
  @IsEmail()
  email: string;
}

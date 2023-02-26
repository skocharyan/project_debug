import { DeepGram } from '@modules/secondary/storage/deepgram-storage/deppgram.entity';
import { IsEmail, IsOptional, IsString } from 'class-validator';

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

  @IsOptional()
  deepGram: DeepGram;
}

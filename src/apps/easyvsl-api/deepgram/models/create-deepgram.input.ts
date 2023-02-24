import { IsString } from 'class-validator';

export class CreateDeepGramInput {
  @IsString()
  keyId: string;

  @IsString()
  key: string;
}

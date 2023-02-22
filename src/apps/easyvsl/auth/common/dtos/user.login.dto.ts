import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
  @IsString()
  @IsEmail()
  @ApiProperty
  email: string;

  @IsString()
  @ApiProperty
  password: string;
}

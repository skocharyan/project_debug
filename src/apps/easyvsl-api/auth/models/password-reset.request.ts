import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Match } from '../common/match.decorator';
import { IsPassword } from '../common/isPassword.decorator';

export class AuthPasswordResetRequest {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  currentPassword: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @IsPassword('newPassword')
  newPassword: string;

  @IsString()
  @Match('newPassword', { message: 'Passwords do not match' })
  confirmPassword: string;
}

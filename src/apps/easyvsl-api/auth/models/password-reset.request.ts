import { IsNotEmpty, IsString, Matches, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthPasswordResetRequest {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  currentPassword: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @Matches(/(?=^.{8,}$)(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.*[a-z])(?=.*[0-9])/, {
    message: 'password is too weak'
  })
  newPassword: string;
}

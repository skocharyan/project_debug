import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  @Expose()
  @ApiProperty()
  userId: number;

  @Expose()
  @ApiProperty()
  accessToken: string;
}

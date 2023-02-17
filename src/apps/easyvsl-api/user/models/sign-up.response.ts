import { ApiProperty } from '@nestjs/swagger';

export class SignUpResponse {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  createdAt: Date;
}

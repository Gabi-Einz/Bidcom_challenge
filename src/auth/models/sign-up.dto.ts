import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({
    description: 'Unique username for the new account',
    example: 'jane_smith',
  })
  userName: string;

  @ApiProperty({
    description: 'Password for the new account',
    example: 'strongPassword456',
  })
  password: string;
}

import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TokenRequest {
  @ApiProperty({
    description: 'Username for authentication',
    example: 'john_doe',
  })
  @IsNotEmpty()
  @IsString()
  userName: string;

  @ApiProperty({
    description: 'User password',
    example: 'mySecurePassword123',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}

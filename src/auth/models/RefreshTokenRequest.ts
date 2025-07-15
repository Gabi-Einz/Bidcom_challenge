import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenRequest {
  @ApiProperty({
    description: 'Valid refresh token to generate new access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  refreshToken: string;
}

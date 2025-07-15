import { ApiProperty } from '@nestjs/swagger';

export class TokenResponse {
  @ApiProperty({
    description: 'JWT access token for API authentication',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;

  @ApiProperty({
    description: 'JWT refresh token for obtaining new access tokens',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  refreshToken: string;
  static build = (accessToken: string, refreshToken: string) => {
    const tokenResponse = new TokenResponse();
    tokenResponse.accessToken = accessToken;
    tokenResponse.refreshToken = refreshToken;
    return tokenResponse;
  };
}

import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenResponse {
  @ApiProperty({
    description: 'New JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accesToken: string;
  static build = (accesToken: string) => {
    const refreshTokenResponse = new RefreshTokenResponse();
    refreshTokenResponse.accesToken = accesToken;
    return refreshTokenResponse;
  };
}

export class TokenResponse {
  accessToken: string;
  refreshToken: string;
  static build = (accessToken: string, refreshToken: string) => {
    const tokenResponse = new TokenResponse();
    tokenResponse.accessToken = accessToken;
    tokenResponse.refreshToken = refreshToken;
    return tokenResponse;
  };
}

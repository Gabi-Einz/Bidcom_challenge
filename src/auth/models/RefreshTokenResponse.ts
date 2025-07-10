export class RefreshTokenResponse {
  accesToken: string;
  static build = (accesToken: string) => {
    const refreshTokenResponse = new RefreshTokenResponse();
    refreshTokenResponse.accesToken = accesToken;
    return refreshTokenResponse;
  };
}

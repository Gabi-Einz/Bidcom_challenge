import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TokenResponse } from './models/TokenResponse';
import { TokenRequest } from './models/TokenRequest';
import { RefreshTokenRequest } from './models/RefreshTokenRequest';
import { RefreshTokenResponse } from './models/RefreshTokenResponse';
import { SignUpDto } from './models/sign-up.dto';
import { CurrentUser } from './decorators/auth.decorator';
import { LocalAuthGuard } from './authentication/jwt/guards/local-auth.guard';
import { User } from 'src/user/models/User';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async createToken(
    @Body() request: TokenRequest,
    @CurrentUser() user: User,
  ): Promise<TokenResponse> {
    return await this.authService.createToken(user);
  }
  @Post('refresh')
  async refreshToken(
    @Body() request: RefreshTokenRequest,
  ): Promise<RefreshTokenResponse> {
    return await this.authService.refreshToken(request.refreshToken);
  }

  @Post('signUp')
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.authService.signUp(signUpDto);
  }
}

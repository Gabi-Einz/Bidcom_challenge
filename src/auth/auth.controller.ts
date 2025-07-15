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
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'User login',
    description:
      'Authenticates user credentials and returns JWT access and refresh tokens',
  })
  @ApiBody({ type: TokenRequest })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: TokenResponse,
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @UseGuards(LocalAuthGuard)
  async createToken(
    @Body() request: TokenRequest,
    @CurrentUser() user: User,
  ): Promise<TokenResponse> {
    return await this.authService.createToken(user);
  }
  @Post('refresh')
  @ApiOperation({
    summary: 'Refresh access token',
    description: 'Generates a new access token using a valid refresh token',
  })
  @ApiBody({ type: RefreshTokenRequest })
  @ApiResponse({
    status: 200,
    description: 'Token refreshed successfully',
    type: RefreshTokenResponse,
  })
  @ApiResponse({ status: 401, description: 'Invalid or expired refresh token' })
  async refreshToken(
    @Body() request: RefreshTokenRequest,
  ): Promise<RefreshTokenResponse> {
    return await this.authService.refreshToken(request.refreshToken);
  }

  @Post('signUp')
  @ApiOperation({
    summary: 'User registration',
    description: 'Creates a new user account with the provided credentials',
  })
  @ApiBody({ type: SignUpDto })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data or user already exists',
  })
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.authService.signUp(signUpDto);
  }
}

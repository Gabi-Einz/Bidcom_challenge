import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenResponse } from './models/TokenResponse';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenResponse } from './models/RefreshTokenResponse';
import { Payload } from './models/Payload';
import { hashSync, compareSync } from 'bcrypt';
import { SignUpDto } from './models/sign-up.dto';
import { User } from 'src/user/models/User';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  async createToken(user: User): Promise<TokenResponse> {
    const payload = { sub: user.id, username: user.name, role: user.role };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE_IN,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE_IN,
    });
    return TokenResponse.build(accessToken, refreshToken);
  }

  async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    try {
      const payload: Payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      const newAccessToken = this.jwtService.sign(
        {
          sub: payload.sub,
          username: payload.username,
          role: payload.role,
        } as Payload,
        {
          secret: process.env.JWT_ACCESS_SECRET,
          expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE_IN,
        },
      );
      return RefreshTokenResponse.build(newAccessToken);
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('invalid refresh token');
    }
  }

  async signUp(signUpDto: SignUpDto) {
    const saltRounds = 10;
    const encryptedPassword: string = hashSync(signUpDto.password, saltRounds);
    return await this.userService.create({
      name: signUpDto.userName,
      password: encryptedPassword,
      role: 'user',
    });
  }

  async validateUser(userName: string, password: string): Promise<User | null> {
    const user = await this.userService.findOneByName(userName);

    if (user && compareSync(password, user.password)) {
      return user;
    }

    return null;
  }
}

import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/user/models/User';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'userName',
    });
  }

  async validate(userName: string, password: string): Promise<Partial<User>> {
    const user: User | null = await this.authService.validateUser(
      userName,
      password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

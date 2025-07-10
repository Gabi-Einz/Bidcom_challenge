import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from 'src/auth/models/Payload';
import { safeGetConfig } from 'src/shared/utils/ConfigHelper';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: safeGetConfig('JWT_ACCESS_SECRET'),
    });
  }

  async validate(payload: Payload) {
    const user = await this.userService.findOneById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('user not authorized');
    }
    return user;
  }
}

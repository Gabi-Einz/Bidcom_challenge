import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './authentication/jwt/strategy/jwt.strategy';
import { LocalStrategy } from './authentication/jwt/strategy/local.strategy';

@Module({
  imports: [UserModule, JwtModule.register({}), PassportModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy],
})
export class AuthModule {}

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/role.enum';
import { ROLES_KEY } from '../decorators/role.decorator';
import { RequestWithUser } from 'src/auth/models/RequestWithUser';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndMerge<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles || requiredRoles.length === 0) return true;

    const request: RequestWithUser = context.switchToHttp().getRequest();
    const user = request.user;
    if (!requiredRoles.includes(user.role)) {
      throw new UnauthorizedException('no permissions to access this resource');
    }
    return true;
  }
}

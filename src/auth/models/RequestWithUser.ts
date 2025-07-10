import { Request } from 'express';
import { Role } from '../authorization/enums/role.enum';

export interface RequestWithUser extends Request {
  user: {
    sub: number;
    username: string;
    iat: number;
    exp: number;
    role: Role;
  };
}

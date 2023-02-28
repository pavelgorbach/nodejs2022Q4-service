import { JwtService } from '@nestjs/jwt/dist';
import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const withoutAuth = this.reflector.get<boolean>(
      'withoutAuth',
      context.getHandler(),
    );

    if (withoutAuth) return true;

    const refreshToken = this.reflector.get<boolean>(
      'refreshToken',
      context.getHandler(),
    );

    try {
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      const token = authHeader?.split(' ')[1];

      if (!token) {
        throw new UnauthorizedException();
      }

      let user: unknown;

      if (refreshToken) {
        user = this.jwtService.verify(token, {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
        });
      } else {
        user = this.jwtService.verify(token);
      }

      req.user = user;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      throw new UnauthorizedException({ message: 'Invalid token' });
    }

    return true;
  }
}

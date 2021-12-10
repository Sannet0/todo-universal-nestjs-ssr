import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization.split(' ');
      const type = authHeader[0];
      const token = authHeader[1];
      const isJWTVerify = this.jwtService.verify(token);

      req.user = isJWTVerify;

      return type === 'Bearer' && isJWTVerify;
    } catch (e) {
      return false;
    }
  }
}

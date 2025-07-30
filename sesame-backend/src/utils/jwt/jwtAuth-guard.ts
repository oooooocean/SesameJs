import { ExecutionContext, Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '@/utils/decorators/auth-white-list';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { TokenExpiredError } from 'jsonwebtoken';

/**
 * 1. AuthGuard('jwt') 会根据 jwt 这个token 去获取指定的Provider 作为 Token 的 Strategy. 保护路由.
 * 2. JwtStrategy 负责解析和验证JWT.
 * 3. JwtModule 负责配置.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  // Guard必须要实现的接口
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
    if (isPublic) return true;
    return super.canActivate(context); // 内部调用 JwtStrategy 来解析
  }

  // 验证通过后返回绑定的User
  handleRequest(err: any, user: any, info: any) {
    if (info || err) {
      let message = 'token校验失败';
      if (info instanceof TokenExpiredError) {
        message = `Token已过期: ${info.expiredAt.toISOString()}`;
      }
      throw new UnauthorizedException(message);
    }
    if (!user) throw new NotFoundException('用户不存在');
    return user;
  }
}

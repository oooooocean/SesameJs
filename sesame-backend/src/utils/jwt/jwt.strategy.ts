import { Strategy, ExtractJwt } from 'passport-jwt';
import type { StrategyOptions } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { User } from '@/user/models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectRepository(User)
    private readonly userResp: Repository<User>,
    private readonly config: ConfigService,
  ) {
    const options = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 指定从请求中提取token的方式
      secretOrKey: config.get('JWT_SECRET'),
    } as StrategyOptions;
    super(options);
  }

  // 当jwt被解析后, 会调用该方法, 返回的结果将被添加到request.user中
  validate({ userId }) {
    return this.userResp.findOneBy({ id: userId });
  }
}

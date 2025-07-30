import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/user/models/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async validateLogin(phone: string, code: string) {
    if (code !== '666666') {
      throw new UnauthorizedException('验证码错误');
    }

    let user = await this.userRepo.findOneBy({ phone });
    if (!user) {
      user = this.userRepo.create({ phone });
      user = await this.userRepo.save(user);
    }

    return user;
  }

  generateToken(user: User): string {
    const payload = { userId: user.id };
    return this.jwtService.sign(payload);
  }
}

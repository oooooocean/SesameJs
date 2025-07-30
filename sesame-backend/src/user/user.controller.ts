import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { GetUser } from '@/utils/decorators/user';
import { User, UserRole } from '@/user/models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { instanceToPlain, plainToInstance } from 'class-transformer';

@Controller('user') // 路由分组
export class UserController {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  /**
   * 获取用户信息
   * @param user
   * @param id
   */
  @Get(':id') // user/1/ 路径参数
  getUser(@GetUser() user: User, @Param('id') id: string) {
    if (user.id === parseInt(id)) return user;
    if (user.role === UserRole.staff) {
      return {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
      };
    }
    return user;
  }

  /**
   * 设置用户信息
   */
  @Patch(':id')
  async updateUser(@GetUser() user: User, @Body() params: User) {
    user = {
      ...user,
      ...params,
    };
    user = await this.userRepo.save(user);
    user = plainToInstance(User, user);
    return instanceToPlain(user);
  }
}

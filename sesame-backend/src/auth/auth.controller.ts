import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { LoginDto } from '@/auth/auth.dto';
import { Public } from '@/utils/decorators/auth-white-list';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.validateLogin(dto.phone, dto.code);
    const token = this.authService.generateToken(user);
    return { token, user };
  }
}

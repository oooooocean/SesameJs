import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@/utils/jwt/jwtAuth-guard';
import { JwtStrategy } from '@/utils/jwt/jwt.strategy';
import { ToolsModule } from './tools/tools.module';
import { Logger } from './tools/services/logger';

/**
 * 配置根模块
 */
@Module({
  imports: [
    // 全局注册配置模块
    ConfigModule.forRoot({ isGlobal: true }),
    // JWT模块: 为Jwt提供配置, 生成, 解码和验证
    JwtModule.registerAsync({
      global: true,
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
    // 数据库ORM配置
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        // autoLoadEntities: true,
        entities: [__dirname + '/**/models/*.entity{.ts,.js}'],
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    PostModule,
    ToolsModule,
  ],
  providers: [JwtStrategy, { provide: APP_GUARD, useClass: JwtAuthGuard }, Logger],
})
export class AppModule {}

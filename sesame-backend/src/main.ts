import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { CustomExceptionFilter } from '@/utils/exception-filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from './tools/services/logger';

async function bootstrap() {
  /**
   * 默认实现了 NestExpressApplication 的实例
   */
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true, // 启用 CORS
  });

  // 从依赖中获取 ConfigService
  const configService = app.get(ConfigService);

  // 日志
  app.useLogger(app.get(Logger));
  // 设置全局验证器, 处理请求参数
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  // 设置全局错误过滤器, 返回统一的错误格式
  app.useGlobalFilters(new CustomExceptionFilter());
  // 静态文件
  app.useStaticAssets(configService.get<string>('FILE_DIR')!, { prefix: '/static/' });


  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port, () => console.log(`Listening on port ${port}`));
}

bootstrap();

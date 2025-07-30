import { Module } from '@nestjs/common';
import { ToolsController } from './tools.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from '@/tools/models/file.entity';
import { Logger } from './services/logger';

@Module({
  controllers: [ToolsController],
  providers: [Logger],
  imports: [TypeOrmModule.forFeature([File])],
  exports: [TypeOrmModule, Logger],
})
export class ToolsModule {}

import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from '@/tools/models/file.entity';
import { Repository } from 'typeorm';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { extname } from 'path';
import * as process from 'node:process';

const storage = diskStorage({
  destination: process.env.FILE_DIR,
  filename: (req, file, callback) => {
    const randomName = uuid() + extname(file.originalname);
    return callback(null, randomName);
  },
});

@Controller()
export class ToolsController {
  constructor(@InjectRepository(File) private readonly fileRepository: Repository<File>) {}

  @Post('upload/images')
  @UseInterceptors(FilesInterceptor('files', 10, { storage }))
  async uploadImages(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 2 * 1024 * 1024 })], // new FileTypeValidator({ fileType: /^image/ })
      }),
    )
    files: Array<Express.Multer.File>,
  ) {
    const items = files.map((e) => ({ filename: e.filename }));
    await this.fileRepository.insert(items);
    return files.map((e) => e.filename);
  }
}

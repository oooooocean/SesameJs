import { ConfigService } from '@nestjs/config';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { extname } from 'path';

export const storageFactory = (configService: ConfigService) => {
  return diskStorage({
    destination: configService.get<string>('FILE_DIR'),
    filename: (req, file, callback) => {
      const randomName = uuid() + extname(file.originalname);
      return callback(null, randomName);
    },
  });
};

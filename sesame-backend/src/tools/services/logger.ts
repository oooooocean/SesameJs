import { Injectable, LoggerService, LogLevel } from '@nestjs/common';
import { Logger as WinstonLogger, createLogger, transports } from 'winston';

@Injectable()
export class Logger implements LoggerService {
    private logger: WinstonLogger;

    constructor() {
        this.logger = createLogger({
            level: 'info',
            transports: [
                new transports.Console(), // 打印到控制台
            ],
        });
    }

    log(message: any, ...optionalParams: any[]) {
        this.logger.log('info', message, ...optionalParams);
    }

    error(message: any, ...optionalParams: any[]) {
        this.logger.error(message, ...optionalParams);
    }

    warn(message: any, ...optionalParams: any[]) {
        this.logger.warn(message, ...optionalParams);
    }
}

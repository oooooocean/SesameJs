import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response, Request } from 'express';
import { ResponseCode } from '@/interfaces/common';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  // 理论上 js 可以抛出任何类型的值
  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const req: Request = ctx.getRequest();
    const res: Response = ctx.getResponse();

    let status = ResponseCode.serverError;
    let message = exception.message ?? 'server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();

      const res = exception.getResponse();

      if (typeof res === 'string') {
        message = res;
      } else if ('message' in res) {
        if (Array.isArray((res as any).message) && (res as any).message.length > 0) {
          message = (res as any).message[0];
        }
      }
    }

    // console.log((exception as HttpException).getResponse());

    const errorRes = {
      message: message,
      code: status,
    };

    // 记录日志
    // const log = `[${req.method}] ${req.url} - ${JSON.stringify(errorRes)}`;

    // 返回统一格式
    res.status(status).jsonp(errorRes);
  }
}

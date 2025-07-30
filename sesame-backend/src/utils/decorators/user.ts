import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * 获取附加在请求中的User
 */
export const GetUser = createParamDecorator((data, context: ExecutionContext) => {
  const user = context.switchToHttp().getRequest().user;
  return data ? user[data] : user;
});

export interface TokenPayload {
  userId: number;
}

export interface Response<T = any> {
  message: string;
  code: number;
  data?: T;
}

export enum ResponseCode {
  success = 200,
  serverError = 500,
  notFound = 404,
  unauthorized = 401,
  badRequest = 400,
}

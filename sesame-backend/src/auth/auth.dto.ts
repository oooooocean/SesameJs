import { IsMobilePhone, Length } from 'class-validator';

export class LoginDto {
  @IsMobilePhone('zh-CN')
  phone: string;

  @Length(6)
  code: string;
}

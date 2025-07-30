import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Post } from '@/post/models/post.entity';
import { IsEmail, IsEnum, IsMobilePhone, IsOptional, Length } from 'class-validator';
import { Exclude } from 'class-transformer';

export enum UserRole {
  admin,
  manager,
  staff,
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  password: string;

  @IsOptional()
  @IsEnum(UserRole)
  @Column({ default: UserRole.staff })
  role: UserRole;

  @IsOptional()
  @Length(2, 20)
  @Column({ nullable: true, length: 50 })
  name?: string;

  @IsOptional()
  @IsEmail()
  @Column({ nullable: true })
  email?: string;

  @IsOptional()
  @IsMobilePhone('zh-CN')
  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ default: false })
  isDeleted: boolean;

  @OneToMany(() => Post, (post) => post.user, { cascade: true }) // 一对多关系
  posts: Post[];
}

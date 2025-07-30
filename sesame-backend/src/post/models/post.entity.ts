import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '@/user/models/user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}

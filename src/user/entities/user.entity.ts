import { BlogEntity } from 'src/blog/entities/blog.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    length: 100,
    nullable: true,
  })
  first_name: string;

  @Column({
    length: 100,
    nullable: true,
  })
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  age: number;

  @OneToMany(() => BlogEntity, (blog) => blog.user)
  blogs: BlogEntity[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

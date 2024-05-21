import { Length } from 'class-validator';
import { UserEntity } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('blogs')
export class BlogEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', nullable: false })
  @Length(3, 255)
  title: string;

  @Column({ type: 'varchar', nullable: false })
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.blogs, { onDelete: 'CASCADE' })
  user: UserEntity;
}

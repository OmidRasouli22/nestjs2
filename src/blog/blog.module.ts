import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { BlogEntity } from './entities/blog.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
@Module({
  imports: [TypeOrmModule.forFeature([BlogEntity, UserEntity])],
  controllers: [BlogController],
  providers: [BlogService, UserService],
})
export class BlogModule {}

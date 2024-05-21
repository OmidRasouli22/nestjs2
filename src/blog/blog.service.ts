import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogEntity } from './entities/blog.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogEntity)
    private blogRepository: Repository<BlogEntity>,
    private userService: UserService,
  ) {}

  async create(createBlogDto: CreateBlogDto) {
    const { title, content, userId } = createBlogDto;
    const findedUser = await this.userService.findOne(userId);
    if (!findedUser) throw new NotFoundException('user not found');
    await this.blogRepository.insert({ title, content, user: findedUser });
    return {
      message: 'Blog Created Successfully',
    };
  }

  async findAll() {
    return await this.blogRepository.find({
      relations: {
        user: true,
      },
      select: {
        user: {
          first_name: true,
          last_name: true,
          email: true,
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.blogRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const blog = await this.blogRepository.findOneBy({ id });
    if (blog) await this.blogRepository.remove(blog);
    else throw new NotFoundException('blog not found');
    return {
      message: 'blog with id: ' + id + ' deleted.',
    };
  }
}

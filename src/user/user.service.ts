import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import {
  And,
  FindOptionsWhere,
  ILike,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { isDate } from 'class-validator';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { first_name, last_name, age, email } = createUserDto;

    // check that if email is unique
    const findedUser = await this.userRepository.findOneBy({ email });
    if (findedUser) throw new ConflictException('this email is already taken.');

    const user = this.userRepository.create({
      first_name,
      last_name,
      age,
      email,
    });

    return this.userRepository.save(user);
  }

  async findAll(search: string) {
    // different method on where filter
    // return await this.userRepository.find({
    //   where: {
    //     id: MoreThan(2),  //MoreThanEqual(2)
    //   },
    // });
    // return await this.userRepository.find({
    //   where: {
    //     id: LessThan(2), //LessThanEqual(2)
    //   },
    // });
    // return await this.userRepository.find({
    //   where: {
    //     first_name: ILike(`omid`),
    //   },
    // });

    let where: FindOptionsWhere<UserEntity> = {};
    if (search && isDate(new Date(search))) {
      let date = new Date(search);
      let start_time = new Date(date.setUTCHours(0, 0, 0));
      let finish_time = new Date(date.setUTCHours(23, 59, 59));
      where['created_at'] = And(
        MoreThanOrEqual(start_time),
        LessThanOrEqual(finish_time),
      );
    }
    return await this.userRepository.find({
      where,
    });
  }

  async pagination({ page = 0, limit = 5 }: { page: number; limit: number }) {
    if (!page || page <= 1) page = 0;

    if (!limit || limit <= 1) limit = 5;

    const skip = page === 0 ? 0 : (page - 1) * limit;
    const totalRows = await this.userRepository.count();
    // firstPageUrl
    const firstPageUrl = `http://localhost:3000/user/pagination?page=1&limit=${limit}`;
    const lastPageIndex = Math.floor(totalRows / limit) + 1;
    const lastPageUrl = `http://localhost:3000/user/pagination?page=${lastPageIndex}&limit=${limit}`;
    const previousPage =
      page === 0 || page === 1
        ? null
        : `http://localhost:3000/user/pagination?page=${page - 1}&limit=${limit}`;
    const nextPage =
      page === lastPageIndex
        ? null
        : page === 0
          ? `http://localhost:3000/user/pagination?page=${page + 2}&limit=${limit}`
          : `http://localhost:3000/user/pagination?page=${page + 1}&limit=${limit}`;

    const users = await this.userRepository.find({
      where: {},
      order: { created_at: 'DESC' },
      take: limit,
      skip,
    });

    return {
      pagination: {
        firstPageUrl,
        lastPageUrl,
        previousPage,
        nextPage,
      },
      data: users,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

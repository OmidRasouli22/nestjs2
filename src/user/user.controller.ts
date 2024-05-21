import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserPaginationDto } from './dto/users-pagination.dto';
import { CreateProfileDto } from './dto/create-profile.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const { first_name, last_name, email, age } = createUserDto;
    return this.userService.create({ first_name, last_name, email, age });
  }

  @Get()
  findAll(@Query('search') search?: string) {
    return this.userService.findAll(search);
  }

  @Get('/pagination')
  pagination(@Query() queryPaginationDto: { page: number; limit: number }) {
    const { page, limit } = queryPaginationDto;
    return this.userService.pagination({ page: +page, limit: +limit });
  }

  @Get('/selection')
  selection() {
    return this.userService.selection();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Get('/blogs/:userId')
  findAllBlogsForOneUser(@Param('userId', ParseIntPipe) id: number) {
    return this.userService.findAllBlogsForOneUser(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post('/profile/:userId')
  createProfile(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createProfileDto: CreateProfileDto,
  ) {
    const { bio, profileImage } = createProfileDto;
    return this.userService.createProfile(userId, { bio, profileImage });
  }
  @Get('/profile/:userId')
  getUserProfile(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.getUserProfile(userId);
  }
}

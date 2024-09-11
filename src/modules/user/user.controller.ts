import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { UserDto } from '@/shared/dtos/user.dto';

import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  // @UseGuards()
  async getAll() {
    return this.userService.find({});
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.userService.findOne({ id });
  }

  @Post()
  async create(@Body() data: UserDto) {
    if (!data) throw new BadRequestException('Missing some information');

    return this.userService.save(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<UserDto>) {
    if (!data) throw new BadRequestException('Missing some information');

    return this.userService.updateOne({ id }, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.userService.deleteOne({ id });
    } catch (err) {
      throw new NotFoundException();
    }
  }
}

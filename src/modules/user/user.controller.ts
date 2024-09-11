import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { UserDto } from '@/shared/dtos';
import { JwtAuthGuard } from '@/shared/guards';

import { UserService } from './user.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll() {
    return this.userService.find({});
  }

  @Get(':id')
  async getById(@Param('id') id: string, @Headers() req) {
    const data = await this.userService.findOne({ id });
    if (!data) {
      throw new NotFoundException();
    }
    return data;
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

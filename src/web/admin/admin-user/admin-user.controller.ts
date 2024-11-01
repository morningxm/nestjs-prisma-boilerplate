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
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ApiMyResponse } from '@/shared/decorators';
import { CreateUserDto, UserDto } from '@/shared/dtos';
import { JwtAuthGuard } from '@/shared/guards';

import { AdminUserService } from './admin-user.service';

@Controller('admin/admin-users')
@UseGuards(JwtAuthGuard)
@ApiTags('Admin/Users')
@ApiBearerAuth()
export class AdminUserController {
  constructor(private readonly userService: AdminUserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiMyResponse({ status: 200, type: [UserDto] })
  async getAll() {
    return this.userService.find({});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by Id' })
  @ApiMyResponse({ status: 200, type: UserDto })
  @ApiMyResponse({ status: 404 })
  async getById(@Param('id') id: string) {
    const data = await this.userService.findOne({ id });
    if (!data) {
      throw new NotFoundException();
    }
    return data;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiMyResponse({ status: 201, type: UserDto })
  @ApiMyResponse({ status: 400 })
  async create(@Body() data: CreateUserDto) {
    if (!data) {
      throw new BadRequestException('Missing some information');
    }

    return this.userService.save(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user by Id' })
  @ApiBody({ type: CreateUserDto })
  @ApiMyResponse({ status: 200, type: UserDto })
  @ApiMyResponse({ status: 404 })
  async update(@Param('id') id: string, @Body() data: Partial<CreateUserDto>) {
    if (!data) {
      throw new BadRequestException('Missing some information');
    }

    return this.userService.updateOne({ id }, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by Id' })
  @ApiMyResponse({ status: 200, type: UserDto })
  @ApiMyResponse({ status: 404 })
  async delete(@Param('id') id: string) {
    try {
      return await this.userService.deleteOne({ id });
    } catch (err) {
      throw new NotFoundException(err);
    }
  }
}

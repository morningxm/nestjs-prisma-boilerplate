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
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ApiBadRequest, ApiNotFound } from '@/shared/decorators';
import { CreateUserDto, UserDto } from '@/shared/dtos';
import { JwtAuthGuard } from '@/shared/guards';

import { UserService } from './user.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiTags('users')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all users',
  })
  @ApiResponse({
    status: 200,
    type: UserDto,
    isArray: true,
  })
  async getAll() {
    return this.userService.find({});
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a user by Id',
  })
  @ApiResponse({
    status: 200,
    type: UserDto,
  })
  @ApiNotFound()
  async getById(@Param('id') id: string, @Headers() req) {
    const data = await this.userService.findOne({ id });
    if (!data) {
      throw new NotFoundException();
    }
    return data;
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new user',
  })
  @ApiBody({
    type: CreateUserDto,
  })
  @ApiResponse({
    status: 201,
    type: UserDto,
  })
  @ApiBadRequest()
  async create(@Body() data: CreateUserDto) {
    if (!data) throw new BadRequestException('Missing some information');

    return this.userService.save(data);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a user by Id',
  })
  @ApiBody({
    type: CreateUserDto,
  })
  @ApiResponse({
    status: 200,
    type: UserDto,
  })
  @ApiNotFound()
  async update(@Param('id') id: string, @Body() data: Partial<CreateUserDto>) {
    if (!data) throw new BadRequestException('Missing some information');

    return this.userService.updateOne({ id }, data);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a user by Id',
  })
  @ApiResponse({
    status: 200,
    type: UserDto,
  })
  @ApiNotFound()
  async delete(@Param('id') id: string) {
    try {
      return await this.userService.deleteOne({ id });
    } catch (err) {
      throw new NotFoundException();
    }
  }
}

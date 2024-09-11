import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ApiBadRequest, ApiNotFound } from '@/shared/decorators';
import { BookmarkDto, CreateBookmarkDto } from '@/shared/dtos';

import { BookmarkService } from './bookmark.service';

@Controller('bookmarks')
@ApiTags('bookmarks')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all bookmarks',
  })
  @ApiResponse({
    status: 200,
    type: BookmarkDto,
    isArray: true,
  })
  async getAll() {
    return this.bookmarkService.find({});
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a bookmark by Id',
  })
  @ApiResponse({
    status: 200,
    type: BookmarkDto,
  })
  @ApiNotFound()
  async getById(@Param('id') id: string) {
    const data = await this.bookmarkService.findOne({ id });
    if (!data) {
      throw new NotFoundException();
    }
    return data;
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new bookmark',
  })
  @ApiBody({
    type: CreateBookmarkDto,
  })
  @ApiResponse({
    status: 201,
    type: CreateBookmarkDto,
  })
  @ApiBadRequest()
  async create(@Body() data: CreateBookmarkDto) {
    return this.bookmarkService.save(data);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a bookmark by Id',
  })
  @ApiBody({
    type: CreateBookmarkDto,
  })
  @ApiResponse({
    status: 200,
    type: CreateBookmarkDto,
  })
  @ApiNotFound()
  async update(@Param('id') id: string, @Body() data: Partial<CreateBookmarkDto>) {
    return this.bookmarkService.updateOne({ id }, data);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a bookmark by Id',
  })
  @ApiResponse({
    status: 200,
    type: CreateBookmarkDto,
  })
  @ApiNotFound()
  async delete(@Param('id') id: string) {
    try {
      return await this.bookmarkService.deleteOne({ id });
    } catch (err) {
      throw new NotFoundException();
    }
  }
}

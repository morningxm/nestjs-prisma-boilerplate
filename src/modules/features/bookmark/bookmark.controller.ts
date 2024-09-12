import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ApiMyResponse } from '@/shared/decorators';
import { BookmarkDto, CreateBookmarkDto, ExtendedBookmarkDto } from '@/shared/dtos';

import { BookmarkService } from './bookmark.service';

@Controller('bookmarks')
@ApiTags('Bookmarks')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Get()
  @ApiOperation({ summary: 'Get all bookmarks' })
  @ApiMyResponse({ status: 200, type: [ExtendedBookmarkDto] })
  async getAll() {
    return this.bookmarkService.find({});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a bookmark by Id' })
  @ApiMyResponse({ status: 200, type: ExtendedBookmarkDto })
  @ApiMyResponse({ status: 404 })
  async getById(@Param('id') id: string) {
    const data = await this.bookmarkService.findOne({ id });
    if (!data) {
      throw new NotFoundException();
    }
    return data;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new bookmark' })
  @ApiBody({ type: CreateBookmarkDto })
  @ApiMyResponse({ status: 201, type: BookmarkDto })
  @ApiMyResponse({ status: 404 })
  async create(@Body() data: CreateBookmarkDto) {
    return this.bookmarkService.save(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a bookmark by Id' })
  @ApiBody({ type: CreateBookmarkDto })
  @ApiMyResponse({ status: 200, type: BookmarkDto })
  @ApiMyResponse({ status: 404 })
  async update(@Param('id') id: string, @Body() data: Partial<CreateBookmarkDto>) {
    return this.bookmarkService.updateOne({ id }, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a bookmark by Id' })
  @ApiMyResponse({ status: 200, type: BookmarkDto })
  @ApiMyResponse({ status: 404 })
  async delete(@Param('id') id: string) {
    try {
      return await this.bookmarkService.deleteOne({ id });
    } catch (err) {
      throw new NotFoundException();
    }
  }
}

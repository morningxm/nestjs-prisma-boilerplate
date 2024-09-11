import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';

import { BookmarkDto } from '@/shared/dtos';

import { BookmarkService } from './bookmark.service';

@Controller('bookmarks')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Get()
  async getAll() {
    return this.bookmarkService.find({});
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const data = await this.bookmarkService.findOne(id);
    if (!data) {
      throw new NotFoundException();
    }
    return data;
  }

  @Post()
  async create(@Body() bookmark: BookmarkDto) {
    return this.bookmarkService.save(bookmark);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() bookmark: Partial<BookmarkDto>) {
    return this.bookmarkService.updateOne(id, bookmark);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.bookmarkService.deleteOne(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }
}

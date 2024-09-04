import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { BookmarkDto } from '@/dto/bookmark.dto';

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
    return this.bookmarkService.findOne(id);
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
    return this.bookmarkService.deleteOne(id);
  }
}

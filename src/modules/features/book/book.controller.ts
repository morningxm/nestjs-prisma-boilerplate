import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';

import { BookDto } from '@/shared/dtos';

import { BookService } from './book.service';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async getAll() {
    return this.bookService.find({});
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const data = await this.bookService.findOne({ id });
    if (!data) {
      throw new NotFoundException();
    }
    return data;
  }

  @Post()
  async create(@Body() data: BookDto) {
    return this.bookService.save(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<BookDto>) {
    return this.bookService.updateOne({ id }, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.bookService.deleteOne({ id });
    } catch (err) {
      throw new NotFoundException();
    }
  }
}

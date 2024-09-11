import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ApiBadRequest, ApiNotFound } from '@/shared/decorators';
import { BookDto, CreateBookDto } from '@/shared/dtos';

import { BookService } from './book.service';

@Controller('books')
@ApiTags('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all books',
  })
  @ApiResponse({
    status: 200,
    type: BookDto,
    isArray: true,
  })
  async getAll() {
    return this.bookService.find({});
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a book by Id',
  })
  @ApiResponse({
    status: 200,
    type: BookDto,
  })
  @ApiNotFound()
  async getById(@Param('id') id: string) {
    const data = await this.bookService.findOne({ id });
    if (!data) {
      throw new NotFoundException();
    }
    return data;
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new book',
  })
  @ApiBody({
    type: CreateBookDto,
  })
  @ApiResponse({
    status: 201,
    type: CreateBookDto,
  })
  @ApiBadRequest()
  async create(@Body() data: CreateBookDto) {
    return this.bookService.save(data);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a book by Id',
  })
  @ApiBody({
    type: CreateBookDto,
  })
  @ApiResponse({
    status: 200,
    type: CreateBookDto,
  })
  @ApiNotFound()
  async update(@Param('id') id: string, @Body() data: Partial<CreateBookDto>) {
    return this.bookService.updateOne({ id }, data);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a book by Id',
  })
  @ApiResponse({
    status: 201,
    type: CreateBookDto,
  })
  @ApiNotFound()
  async delete(@Param('id') id: string) {
    try {
      return await this.bookService.deleteOne({ id });
    } catch (err) {
      throw new NotFoundException();
    }
  }
}

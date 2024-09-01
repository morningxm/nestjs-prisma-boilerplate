import { Injectable } from '@nestjs/common';
import { FilterQuery, QueryOptions } from 'mongoose';

import { Book, BookDocument } from '@/schemas/book.schema';

import { BookDAO } from './book.dao';

@Injectable()
export class BookService {
  constructor(private readonly dao: BookDAO) {}

  async save(book: Book) {
    return this.dao.create(book);
  }

  async find(filter: FilterQuery<BookDocument>, options?: QueryOptions<BookDocument>) {
    return this.dao.find(filter, options);
  }

  async findOne(id: string, options?: QueryOptions<BookDocument>) {
    return this.dao.findById(id, options);
  }

  async updateOne(id: string, book: Partial<Book>, options?: QueryOptions<BookDocument>) {
    return this.dao.updateById(id, book, options);
  }

  async deleteOne(id: string, options?: QueryOptions<BookDocument>) {
    return this.dao.deleteById(id, options);
  }
}

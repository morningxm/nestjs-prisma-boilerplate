import { Injectable } from '@nestjs/common';
import { FilterQuery, QueryOptions } from 'mongoose';

import { Bookmark, BookmarkDocument } from '@/schemas/bookmark.schema';

import { BookmarkDAO } from './bookmark.dao';

@Injectable()
export class BookmarkService {
  constructor(private readonly dao: BookmarkDAO) {}

  async save(book: Bookmark) {
    return this.dao.create(book);
  }

  async find(
    filter: FilterQuery<BookmarkDocument>,
    options?: QueryOptions<BookmarkDocument>,
  ) {
    return this.dao.find(filter, options);
  }

  async findOne(id: string, options?: QueryOptions<BookmarkDocument>) {
    return this.dao.findById(id, options);
  }

  async updateOne(
    id: string,
    book: Partial<Bookmark>,
    options?: QueryOptions<BookmarkDocument>,
  ) {
    return this.dao.updateById(id, book, options);
  }

  async deleteOne(id: string, options?: QueryOptions<BookmarkDocument>) {
    return this.dao.deleteById(id, options);
  }
}

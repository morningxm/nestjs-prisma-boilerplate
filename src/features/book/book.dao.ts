import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryOptions } from 'mongoose';

import { DAO } from '@/core/database/database.dao';
import { Book, BookDocument } from '@/schemas/book.schema';

@Injectable()
export class BookDAO extends DAO<BookDocument> {
  constructor(@InjectModel(Book.name) model: Model<BookDocument>) {
    super(model);
  }
}

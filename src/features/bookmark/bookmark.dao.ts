import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { DAO } from '@/core/database/database.dao';
import { Bookmark, BookmarkDocument } from '@/schemas/bookmark.schema';

@Injectable()
export class BookmarkDAO extends DAO<BookmarkDocument> {
  constructor(@InjectModel(Bookmark.name) model: Model<BookmarkDocument>) {
    super(model);
  }

  async findByBookId(bookId: string) {
    this.model.find({ bookId });
  }
}

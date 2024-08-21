import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Bookmark, BookmarkSchema } from '@/schemas/bookmark.schema';

import { BookmarkDAO } from './bookmark.dao';
import { BookmarkService } from './bookmark.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Bookmark.name, schema: BookmarkSchema },
    ]),
  ],
  providers: [BookmarkDAO, BookmarkService],
})
export class BookmarkModule {}

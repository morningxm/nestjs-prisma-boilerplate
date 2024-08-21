import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Bookmark, BookmarkSchema } from '@/schemas/bookmark.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Bookmark.name, schema: BookmarkSchema },
    ]),
  ],
})
export class BookmarkModule {}

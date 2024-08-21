import { Module } from '@nestjs/common';

import { BookModule } from './book/book.module';
import { BookmarkModule } from './bookmark/bookmark.module';

@Module({
  imports: [BookModule, BookmarkModule],
})
export class FeaturesModule {}

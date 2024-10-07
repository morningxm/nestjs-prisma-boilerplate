import { Module } from '@nestjs/common';

import { CoreModule } from '@/web/core/core.module';

import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';

@Module({
  imports: [CoreModule],
  providers: [BookmarkService],
  controllers: [BookmarkController],
})
export class BookmarkModule {}

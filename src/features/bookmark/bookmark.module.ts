import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/core/database/database.module';
import { PrismaService } from '@/core/database/prisma.service';

import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';

@Module({
  imports: [DatabaseModule],
  providers: [PrismaService, BookmarkService],
  controllers: [BookmarkController],
})
export class BookmarkModule {}

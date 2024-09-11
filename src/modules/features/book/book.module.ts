import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/modules/core/database/database.module';
import { PrismaService } from '@/modules/core/database/prisma.service';

import { BookController } from './book.controller';
import { BookService } from './book.service';

@Module({
  imports: [DatabaseModule],
  providers: [PrismaService, BookService],
  controllers: [BookController],
})
export class BookModule {}

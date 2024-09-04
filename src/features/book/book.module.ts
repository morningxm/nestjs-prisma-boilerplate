import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/core/database/database.module';
import { PrismaService } from '@/core/database/prisma.service';

import { BookController } from './book.controller';
import { BookService } from './book.service';

@Module({
  imports: [DatabaseModule],
  providers: [PrismaService, BookService],
  controllers: [BookController],
})
export class BookModule {}

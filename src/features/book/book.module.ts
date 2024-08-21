import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Book, BookSchema } from '@/schemas/book.schema';

import { BookDAO } from './book.dao';
import { BookService } from './book.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  ],
  providers: [BookDAO, BookService],
})
export class BookModule {}

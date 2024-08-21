import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Book, BookSchema } from '@/schemas/book.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  ],
})
export class BookModule {}

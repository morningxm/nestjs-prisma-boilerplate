import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

import { Book } from './book.schema';

@Schema()
export class Bookmark {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Book', required: true })
  bookId: Book | Types.ObjectId;

  @Prop({ required: true })
  pageNumber: number;

  @Prop()
  notes?: string;
}

export type BookmarkDocument = HydratedDocument<Bookmark>;

export const BookmarkSchema = SchemaFactory.createForClass(Bookmark);

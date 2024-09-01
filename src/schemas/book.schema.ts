import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Book {
  @Prop({ required: true, unique: true, maxlength: 100 })
  title: string;

  @Prop({ required: true, maxlength: 100 })
  author: string;

  @Prop({ enum: ['fiction', 'non-fiction', 'fantasy', 'sci-fi', 'horror'] })
  genre?: string;

  @Prop({
    validate: function (value) {
      return new Date(value) <= new Date();
    },
  })
  publicationYear: Date;
}

export type BookDocument = HydratedDocument<Book>;

export const BookSchema = SchemaFactory.createForClass(Book);

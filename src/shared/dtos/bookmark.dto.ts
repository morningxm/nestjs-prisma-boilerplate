import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsInt, IsMongoId, IsObject, IsOptional, IsString } from 'class-validator';

import { BookDto } from './book.dto';

export class BookmarkDto {
  @IsMongoId()
  @ApiProperty({ description: 'ID', default: '66c5bcc87ed8c8195b73ab3d' })
  id: string;

  @IsString()
  @IsMongoId()
  @ApiProperty({ description: 'Book ID', default: '66e1c5a0809bae0741157574' })
  bookId: string;

  @IsInt()
  @ApiProperty({ description: 'Page number', default: 100 })
  pageNumber: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Note', default: 'Tracy is sick' })
  notes?: string;
}

export class CreateBookmarkDto extends OmitType(BookmarkDto, ['id']) {}

export class ExtendedBookmarkDto extends BookmarkDto {
  @IsObject()
  @ApiProperty({ description: 'Book', type: () => BookDto })
  book: BookDto;
}

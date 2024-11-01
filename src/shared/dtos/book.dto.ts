import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Bookmark } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
  MaxDate,
  MaxLength,
} from 'class-validator';

import { BookmarkDto } from './bookmark.dto';

enum Genre {
  fiction = 'fiction',
  'non-fiction' = 'non-fiction',
  fantasy = 'fantasy',
  'sci-fi' = 'sci-fi',
  horror = 'horror',
}

export class BookDto {
  @IsMongoId()
  @ApiProperty({ description: 'ID', default: '66e1c5a0809bae0741157574' })
  id: string;

  @IsString()
  @MaxLength(100)
  @ApiProperty({ description: 'Title', default: 'If tomorrow comes' })
  title: string;

  @IsString()
  @MaxLength(100)
  @ApiProperty({ description: 'Author', default: 'Sydney Shelden' })
  author: string;

  @IsEnum(Genre)
  @IsOptional()
  @ApiProperty({ description: 'Genre', enum: Genre })
  genre?: Genre;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MaxDate(() => new Date())
  @IsOptional()
  @ApiProperty({ description: 'Publication Year' })
  publicationYear?: Date;
}

export class CreateBookDto extends OmitType(BookDto, ['id']) {}

export class ExtendedBookDto extends BookDto {
  @IsArray()
  @ApiProperty({ description: 'Bookmarks', type: () => BookmarkDto, isArray: true })
  bookmarks: Bookmark[];
}

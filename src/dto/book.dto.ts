import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString, MaxDate, MaxLength } from 'class-validator';

enum Genre {
  fiction = 'fiction',
  'non-fiction' = 'non-fiction',
  fantasy = 'fantasy',
  'sci-fi' = 'sci-fi',
  horror = 'horror',
}

export class BookDto {
  @IsString()
  @MaxLength(100)
  title: string;

  @IsString()
  @MaxLength(100)
  author: string;

  @IsEnum(Genre)
  @IsOptional()
  genre?: string;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MaxDate(() => new Date())
  @IsOptional()
  publicationYear?: Date;
}

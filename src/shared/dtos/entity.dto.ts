import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsOptional } from 'class-validator';

import { BookDto } from './book.dto';
import { BookmarkDto } from './bookmark.dto';
import { UserDto } from './user.dto';

enum EntityType {
  book = 'book',
  bookmark = 'bookmark',
  user = 'user',
}

export class EntityDto {
  @IsMongoId()
  @ApiProperty({ description: 'ID' })
  id: string;

  @IsEnum(EntityType)
  @ApiProperty({ description: 'EntityType', enum: EntityType })
  entityType: EntityType;

  @IsMongoId()
  @ApiProperty({ description: 'Reference ID' })
  entityId: string;

  @IsOptional()
  @ApiProperty({ required: false })
  book: BookDto;

  @IsOptional()
  @ApiProperty({ required: false })
  bookmark: BookmarkDto;

  @IsOptional()
  @ApiProperty({ required: false })
  user: UserDto;
}

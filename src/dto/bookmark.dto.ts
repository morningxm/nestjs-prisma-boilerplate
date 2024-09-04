import { IsDate, IsEnum, IsInt, IsMongoId, IsOptional, IsString, MaxDate, MaxLength, isString } from 'class-validator';

export class BookmarkDto {
  @IsString()
  @IsMongoId()
  boolId: string;

  @IsInt()
  pageNumber: number;

  @IsString()
  @IsOptional()
  ntoes?: string;
}

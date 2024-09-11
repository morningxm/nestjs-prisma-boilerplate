import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

import { GENDER } from '@/shared/enums';

export class UserDto {
  @IsString()
  @MaxLength(100)
  email: string;

  @IsString()
  @MaxLength(100)
  password: string;

  @IsString()
  @MaxLength(100)
  name: string;

  @IsEnum(GENDER)
  @IsOptional()
  gender?: GENDER;
}

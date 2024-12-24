import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { UserDto } from './user.dto';

export class LoginDto extends PickType(UserDto, ['email', 'password']) {}

export class LoginSuccessDto {
  @IsString()
  @ApiProperty({ description: 'JWT token' })
  token: string;
}

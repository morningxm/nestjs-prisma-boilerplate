import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { UserDto } from './user.dto';

export class LoginDto extends PickType(UserDto, ['email', 'password']) {}

export class LoginSuccessDto {
  @IsString()
  @ApiProperty({
    description: 'JWT token',
    default:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndvcmxkQG5lc3QuY29tIiwic3ViIjoiNjZlMWM4YTM5ODNhZTI2MDExNmQ5ZDQ3IiwiaWF0IjoxNzI2MDkxNjkwLCJleHAiOjE3MjYwOTg4OTB9.RXocShfrwIlJU5FN2--IlxtteF3V-fdX1cKf1-f0Jj8',
  })
  token: string;
}

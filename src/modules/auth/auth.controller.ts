import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User as UserSchema } from '@prisma/client';

import { User } from '@/shared/decorators';
import { LoginDto, UserDto } from '@/shared/dtos';
import { LocalAuthGuard } from '@/shared/guards';

import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  @ApiOperation({
    summary: 'Login with email/password',
  })
  @UseGuards(LocalAuthGuard)
  @ApiBody({
    type: LoginDto,
  })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@User() user: UserSchema): Promise<any> {
    return this.authService.login(user);
  }

  @Post('signup')
  @ApiOperation({
    summary: 'Register a new user',
  })
  @ApiBody({ type: UserDto })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async signup(@Body() body: UserDto) {
    return this.userService.save(body);
  }
}

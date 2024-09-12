import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User as UserSchema } from '@prisma/client';

import { UserService } from '@/modules/user/user.service';
import { ApiMyResponse, User } from '@/shared/decorators';
import { CreateUserDto, LoginDto, LoginSuccessDto, UserDto } from '@/shared/dtos';
import { LocalAuthGuard } from '@/shared/guards';

import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Login with email/password' })
  @UseGuards(LocalAuthGuard)
  @ApiBody({
    type: LoginDto,
  })
  @ApiMyResponse({ status: 200, type: LoginSuccessDto })
  @ApiMyResponse({ status: 401 })
  async login(@User() user: UserSchema): Promise<any> {
    return this.authService.login(user);
  }

  @Post('signup')
  @ApiOperation({
    summary: 'Register a new user',
  })
  @ApiBody({ type: CreateUserDto })
  @ApiMyResponse({ status: 201, type: UserDto })
  @ApiMyResponse({ status: 400 })
  async signup(@Body() body: CreateUserDto) {
    return this.userService.save(body);
  }
}

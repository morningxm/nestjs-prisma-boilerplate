import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User as UserSchema } from '@prisma/client';

import { UserService } from '@/modules/user/user.service';
import { ApiBadRequest, ApiUnAuthorized, User } from '@/shared/decorators';
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
  @ApiOperation({
    summary: 'Login with email/password',
  })
  @UseGuards(LocalAuthGuard)
  @ApiBody({
    type: LoginDto,
  })
  @ApiResponse({ status: 200, type: LoginSuccessDto })
  @ApiUnAuthorized()
  async login(@User() user: UserSchema): Promise<any> {
    return this.authService.login(user);
  }

  @Post('signup')
  @ApiOperation({
    summary: 'Register a new user',
  })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, type: UserDto })
  @ApiBadRequest()
  async signup(@Body() body: CreateUserDto) {
    return this.userService.save(body);
  }
}

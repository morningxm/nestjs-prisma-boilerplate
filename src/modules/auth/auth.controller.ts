import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { User as UserSchema } from '@prisma/client';

import { User } from '@/shared/decorators/user.decorator';
import { UserDto } from '@/shared/dtos';
import { LocalAuthGuard } from '@/shared/guards';

import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@User() user: UserSchema): Promise<any> {
    return this.authService.login(user);
  }

  @Post('signup')
  async signup(@Body() body: UserDto) {
    return this.userService.save(body);
  }
}

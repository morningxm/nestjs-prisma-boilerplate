import { Controller, Post, UseGuards } from '@nestjs/common';
import { User as UserSchema } from '@prisma/client';

import { User } from '@/shared/decorators/user.decorator';
import { LocalAuthGuard } from '@/shared/guards';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@User() user: UserSchema): Promise<any> {
    return this.authService.login(user);
  }
}

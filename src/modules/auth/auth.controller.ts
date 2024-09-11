import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import * as crypto from 'crypto';

import { UserService } from '@/modules/user/user.service';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userSerivice: UserService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: any, @Res() res): Promise<any> {
    const { email, password } = body;

    if (!email || !password) {
      return res.status(HttpStatus.BAD_REQUEST).send('Missing email or password');
    }

    const user = await this.userSerivice.findOne({
      email,
      password: crypto.createHmac('sha256', password).digest('hex'),
    });

    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).send('No user found with this email and password');
    }

    const result = this.authService.createToken(email);

    return res.json(result);
  }
}

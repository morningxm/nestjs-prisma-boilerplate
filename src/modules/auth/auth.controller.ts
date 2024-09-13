import { InjectQueue } from '@nestjs/bullmq';
import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User as UserSchema } from '@prisma/client';
import { Queue } from 'bullmq';

import { UserService } from '@/modules/user/user.service';
import { ApiMyResponse, User } from '@/shared/decorators';
import { CreateUserDto, LoginDto, LoginSuccessDto, UserDto } from '@/shared/dtos';
import { AUTH_JOB, QUEUE } from '@/shared/enums';
import { LocalAuthGuard } from '@/shared/guards';

import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    @InjectQueue(QUEUE.AUTH_QUEUE) private userQueue: Queue,
    private readonly logger: Logger,
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
    const data = await this.userService.save(body);

    const job = await this.userQueue.add(AUTH_JOB.SEND_SIGNUP_EMAIL, data);
    return data;
  }
}

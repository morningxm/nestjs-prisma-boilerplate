import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '@/modules/user/user.service';
import { ENV } from '@/shared/enums';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  createToken(email: string, ttl?: number) {
    const user = { email };
    const token = this.jwtService.sign(user);

    return {
      token,
    };
  }

  async validateUser({ email, password }: { email: string; password: string }): Promise<boolean> {
    const user = await this.userService.findByEmail(email);

    return !!user;
  }
}

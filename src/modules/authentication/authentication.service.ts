import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

import { UserService } from '@/modules/user/user.service';
import { ENV } from '@/shared/enums';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  createToken(email: string, ttl?: number) {
    const expiresIn = ttl || 60 * 60;
    const secretOrKey = this.configService.get(ENV.SECRET);
    const user = { email };
    const token = jwt.sign(user, secretOrKey, { expiresIn });

    return {
      expiresIn,
      token,
    };
  }

  async validateUser({ email, password }: { email: string; password: string }): Promise<boolean> {
    const user = await this.userService.findByEmail(email);
    console.log(!!user, 'user');
    return !!user;
  }
}

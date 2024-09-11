import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { UserService } from '@/modules/user/user.service';

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

  async validateUser({ email, password }: { email: string; password: string }): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      return false;
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return null;
    }

    delete user.password;
    return user;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}

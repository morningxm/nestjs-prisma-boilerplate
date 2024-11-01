import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { AdminUserService } from '../admin-user/admin-user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: AdminUserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<User | null> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      return null;
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return null;
    }

    delete user.password;
    return user;
  }

  async login(user: Pick<User, 'email' | 'id'>) {
    const payload = { email: user.email, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}

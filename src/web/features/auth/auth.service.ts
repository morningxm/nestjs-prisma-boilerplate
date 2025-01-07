import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '@/core/database/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser({ email, password }: { email: string; password: string }): Promise<User> {
    const user = await this.findUserByEmail(email);

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

  async findUserByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  public async saveUser(data: Prisma.UserCreateInput): Promise<User> {
    data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync());
    try {
      return await this.prisma.user.create({
        data,
      });
    } catch (error) {
      if (
        error.code?.toLowerCase() === 'p2002' &&
        error.meta?.target?.toLowerCase() === 'users_email_key'
      ) {
        throw new BadRequestException('Email already in use. Please try a different email.');
      }
      throw error;
    }
  }
}

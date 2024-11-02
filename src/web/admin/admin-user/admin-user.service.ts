import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '@/web/core/database/prisma.service';

@Injectable()
export class AdminUserService {
  constructor(private prisma: PrismaService) {}

  async find(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(where: Prisma.UserWhereInput): Promise<User> {
    return this.prisma.user.findFirst({ where });
  }

  async findByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async save(data: Prisma.UserCreateInput): Promise<User> {
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

  async updateOne(where: Prisma.UserWhereUniqueInput, data: Partial<User>) {
    return this.prisma.user.update({
      where,
      data,
    });
  }

  async deleteOne(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.delete({
      where,
    });
  }
}

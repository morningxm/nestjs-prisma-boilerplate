import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as crypto from 'crypto';

import { PrismaService } from '@/modules/core/database/prisma.service';

@Injectable()
export class UserService {
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

  async findByEmail(email: string) {
    return null;
  }

  async save(data: Prisma.UserCreateInput): Promise<User> {
    data.password = crypto.createHmac('sha256', data.password).digest('hex');
    return this.prisma.user.create({
      data,
    });
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

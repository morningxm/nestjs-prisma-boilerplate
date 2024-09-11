import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

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

  async findByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async save(data: Prisma.UserCreateInput): Promise<User> {
    console.log(data, 'data');
    data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync());
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

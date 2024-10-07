import { Injectable } from '@nestjs/common';
import { Entity, Prisma } from '@prisma/client';
import * as _ from 'lodash';

import { PrismaService } from '@/web/core/database/prisma.service';

@Injectable()
export class EntityService {
  constructor(private readonly prisma: PrismaService) {}

  async find(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.EntityWhereUniqueInput;
    where?: Prisma.EntityWhereInput;
    orderBy?: Prisma.EntityOrderByWithRelationInput;
  }): Promise<Entity[]> {
    const { skip, take, cursor, where, orderBy } = params;
    const data = await this.prisma.entity.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        book: true,
        bookmark: true,
        user: true,
      },
    });

    return data.map((item) => _.omitBy(item, _.isNil)) as Entity[];
  }
}

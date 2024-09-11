import { Injectable } from '@nestjs/common';
import { Bookmark, Prisma } from '@prisma/client';

import { PrismaService } from '@/modules/core/database/prisma.service';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  async find(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.BookmarkWhereUniqueInput;
    where?: Prisma.BookmarkWhereInput;
    orderBy?: Prisma.BookmarkOrderByWithRelationInput;
  }): Promise<Bookmark[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.bookmark.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        book: true,
      },
    });
  }

  async findOne(where): Promise<Bookmark | null> {
    return this.prisma.bookmark.findUnique({
      where,
      include: {
        book: true,
      },
    });
  }

  async save(data: Prisma.BookmarkCreateInput): Promise<Bookmark> {
    return this.prisma.bookmark.create({
      data,
    });
  }

  async updateOne(where, data: Partial<Bookmark>) {
    return this.prisma.bookmark.update({
      where,
      data,
    });
  }

  async deleteOne(where) {
    return this.prisma.bookmark.delete({
      where,
    });
  }
}

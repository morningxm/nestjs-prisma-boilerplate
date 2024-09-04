import { Injectable } from '@nestjs/common';
import { Bookmark, Prisma } from '@prisma/client';

import { PrismaService } from '@/core/database/prisma.service';

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

  async findOne(id: string): Promise<Bookmark | null> {
    return this.prisma.bookmark.findUnique({
      where: {
        id,
      },
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

  async updateOne(id: string, data: Partial<Bookmark>) {
    return this.prisma.bookmark.update({
      where: { id },
      data,
    });
  }

  async deleteOne(id: string) {
    return this.prisma.bookmark.delete({
      where: { id },
    });
  }
}

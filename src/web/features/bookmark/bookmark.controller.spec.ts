import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '@/web/core/database/prisma.service';

import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';

describe('BookmarkController', () => {
  let controller: BookmarkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookmarkController],
      providers: [BookmarkService, PrismaService],
    }).compile();

    controller = module.get<BookmarkController>(BookmarkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

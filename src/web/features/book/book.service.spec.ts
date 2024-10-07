import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '@/web/core/database/prisma.service';

import { BookService } from './book.service';

describe('BookService', () => {
  let service: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookService, PrismaService],
    }).compile();

    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

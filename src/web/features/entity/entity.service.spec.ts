import { Test, TestingModule } from '@nestjs/testing';

import { CoreModule } from '@/web/core/core.module';

import { EntityService } from './entity.service';

describe('EntityService', () => {
  let service: EntityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CoreModule],
      providers: [EntityService],
    }).compile();

    service = module.get<EntityService>(EntityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to get entities', async () => {
    const data = await service.find({});
    expect(Array.isArray(data)).toBe(true);
  });
});

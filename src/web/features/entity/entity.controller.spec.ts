import { Test, TestingModule } from '@nestjs/testing';

import { CoreModule } from '@/web/core/core.module';

import { EntityController } from './entity.controller';
import { EntityService } from './entity.service';

describe('EntityController', () => {
  let controller: EntityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CoreModule],
      controllers: [EntityController],
      providers: [EntityService],
    }).compile();

    controller = module.get<EntityController>(EntityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be able to get entities', async () => {
    const data = await controller.getAll();
    expect(data).toBeDefined();
  });
});

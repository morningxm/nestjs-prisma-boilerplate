import { Test, TestingModule } from '@nestjs/testing';

import { CoreModule } from '@/web/core/core.module';

import { AdminUserController } from './admin-user.controller';
import { AdminUserService } from './admin-user.service';

describe('admin/AdminUserController', () => {
  let controller: AdminUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CoreModule],
      providers: [AdminUserService],
      controllers: [AdminUserController],
    }).compile();

    controller = module.get<AdminUserController>(AdminUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';

import { CoreModule } from '@/web/core/core.module';

import { AdminUserService } from './admin-user.service';

describe('admin/AdminUserService', () => {
  let service: AdminUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CoreModule],
      providers: [AdminUserService],
    }).compile();

    service = module.get<AdminUserService>(AdminUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

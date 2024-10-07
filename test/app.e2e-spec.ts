import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { EntityService } from '@/web/features/entity/entity.service';
import { WebModule } from '@/web/web.module';

describe('EntityController (e2e)', () => {
  let app: INestApplication;
  const mockEntityService = { find: () => ['test'] };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [WebModule],
    })
      .overrideProvider(EntityService)
      .useValue(mockEntityService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close(); // Ensure application is closed after all tests
  });

  it('/entities (GET)', () => {
    const res = request(app.getHttpServer()).get('/entities');
    return res.expect(200).expect(mockEntityService.find());
  });
});

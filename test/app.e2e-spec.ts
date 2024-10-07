import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '@/app.module';
import { EntityService } from '@/modules/features/entity/entity.service';

describe('EntityController (e2e)', () => {
  let app: INestApplication;
  const mockEntityService = { find: () => ['test'] };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
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

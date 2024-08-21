import 'reflect-metadata';
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';

import { envConfig } from '@/config/env.config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(envConfig.APP_PORT || 3000);
}
bootstrap();

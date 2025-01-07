import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';

import { RequestLoggerMiddleware } from '@/shared/middlewares';

import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [Logger],
})
export class WorkerModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}

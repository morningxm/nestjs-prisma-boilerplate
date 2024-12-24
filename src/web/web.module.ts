import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { CoreModule } from '@/core/core.module';
import { HealthcheckModule } from '@/core/healthcheck/healthcheck.module';
import { WebsocketGatewayModule } from '@/gateways/websocket.gateway.module';
import { RequestLoggerMiddleware } from '@/shared/middlewares';

import { FeaturesModule } from './features/features.module';

@Module({
  imports: [
    CoreModule,
    HealthcheckModule,
    FeaturesModule,
    WebsocketGatewayModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'public'),
      serveRoot: '/',
    }),
  ],
  controllers: [],
  providers: [Logger],
})
export class WebModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}

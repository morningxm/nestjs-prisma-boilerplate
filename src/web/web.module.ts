import { BullModule } from '@nestjs/bullmq';
import { CacheModule } from '@nestjs/cache-manager';
import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { redisStore } from 'cache-manager-redis-yet';
import { join } from 'path';

import { WebsocketGatewayModule } from '@/gateways/websocket.gateway.module';
import { Configuration } from '@/shared/config';
import { CACHE_TYPE, ENV } from '@/shared/enums';
import { RequestLoggerMiddleware } from '@/shared/middlewares';

import { AdminModule } from './admin/admin.module';
import { CoreModule } from './core/core.module';
import { FeaturesModule } from './features/features.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [Configuration] }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      isGlobal: true,
      useFactory: async (configService: ConfigService) => {
        const cacheMode = configService.get(ENV.CACHE_MODE);

        return cacheMode === CACHE_TYPE.REDIS
          ? {
              store: await redisStore({
                socket: {
                  host: configService.get(ENV.REDIS_HOST),
                  port: configService.get(ENV.REDIS_PORT),
                },
              }),
              ttl: +configService.get(ENV.CACHE_TTL),
            }
          : {
              ttl: +configService.get(ENV.CACHE_TTL),
            };
      },
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          connection: {
            host: configService.get(ENV.REDIS_HOST),
            port: configService.get(ENV.REDIS_PORT),
          },
          defaultJobOptions: {
            removeOnComplete: 1000,
            removeOnFail: 5000,
            attempts: 3,
          },
        };
      },
    }),
    CoreModule,
    FeaturesModule,
    AdminModule,
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

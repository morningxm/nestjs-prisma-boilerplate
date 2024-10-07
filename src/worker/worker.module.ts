import { BullModule } from '@nestjs/bullmq';
import { CacheModule } from '@nestjs/cache-manager';
import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';

import { Configuration } from '@/shared/config';
import { CACHE_TYPE, ENV } from '@/shared/enums';

import { RequestLoggerMiddleware } from '../shared/middlewares';
import { AuthModule } from './auth/auth.module';

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
    AuthModule,
  ],
  controllers: [],
  providers: [Logger],
})
export class WorkerModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}

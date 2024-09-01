import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

import { Configuration } from './config';
import { CoreModule } from './core/core.module';
import { ENV } from './enum';
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

        return cacheMode === 'redis'
          ? {
              ttl: +configService.get(ENV.CACHE_TTL),
              store: redisStore,
              host: configService.get(ENV.REDIS_HOST),
              port: configService.get(ENV.REDIS_PORT),
            }
          : {
              ttl: +configService.get(ENV.CACHE_TTL),
            };
      },
    }),
    CoreModule,
    FeaturesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

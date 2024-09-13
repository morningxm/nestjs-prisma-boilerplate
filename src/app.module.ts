import { CacheModule } from '@nestjs/cache-manager';
import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { redisStore } from 'cache-manager-redis-yet';
import { join } from 'path';

import { WebsocketGatewayModule } from './gateways/websocket.gateway.module';
import { AuthModule } from './modules/auth/auth.module';
import { CoreModule } from './modules/core/core.module';
import { queueConfig } from './modules/core/queue/queue.config';
import { FeaturesModule } from './modules/features/features.module';
import { UserModule } from './modules/user/user.module';
import { Configuration } from './shared/config';
import { CACHE_TYPE, ENV } from './shared/enums';
import { RequestLoggerMiddleware } from './shared/middlewares';

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
    queueConfig,
    CoreModule,
    AuthModule,
    FeaturesModule,
    UserModule,
    WebsocketGatewayModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/assets',
    }),
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}

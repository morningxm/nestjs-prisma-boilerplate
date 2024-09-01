import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';

import { CoreModule } from './core/core.module';
import { FeaturesModule } from './features/features.module';

@Module({
  imports: [
    CacheModule.register({ isGlobal: true, store: redisStore, host: 'localhost', port: 6379 }),
    CoreModule,
    FeaturesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

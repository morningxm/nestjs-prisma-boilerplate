import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { redisStore } from 'cache-manager-redis-yet';

import { CoreModule } from '@/modules/core/core.module';
import { CACHE_TYPE, ENV } from '@/shared/enums';

import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';

describe('PokemonController', () => {
  let controller: PokemonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CoreModule,
        // ConfigModule.forRoot({ isGlobal: true, load: [Configuration] }),
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
      ],
      controllers: [PokemonController],
      providers: [
        HttpService,
        PokemonService,
        {
          provide: 'AXIOS_INSTANCE_TOKEN',
          useFactory: () => {
            // Return Axios instance or configuration here
          },
        },
      ],
      exports: ['AXIOS_INSTANCE_TOKEN'],
    }).compile();

    controller = module.get<PokemonController>(PokemonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

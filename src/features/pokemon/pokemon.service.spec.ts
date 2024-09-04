import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Test, TestingModule } from '@nestjs/testing';

import { PokemonService } from './pokemon.service';

describe('PokemonService', () => {
  let service: PokemonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: CACHE_MANAGER, useFactory: () => {} },
        PokemonService,
        HttpService,
        {
          provide: 'AXIOS_INSTANCE_TOKEN',
          useFactory: () => {
            // Return Axios instance or configuration here
          },
        },
      ],
    }).compile();

    service = module.get<PokemonService>(PokemonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';

@Module({
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
})
export class PokemonModule {}

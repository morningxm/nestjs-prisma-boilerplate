import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';

import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly service: PokemonService) {}

  @UseInterceptors(CacheInterceptor)
  // @CacheKey('get-pokemon')
  @CacheTTL(10) // override TTL to 30 seconds
  @Get(':id')
  async getPokemon(@Param('id') id: number) {
    return await this.service.getPokemon(+id);
  }
}

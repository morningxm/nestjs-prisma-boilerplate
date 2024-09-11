import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PokemonService } from './pokemon.service';

@Controller('pokemon')
@ApiTags('pokemon')
export class PokemonController {
  constructor(private readonly service: PokemonService) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Get a Pokemon',
  })
  async getPokemon(@Param('id') id: number) {
    return await this.service.getPokemon(+id);
  }
}

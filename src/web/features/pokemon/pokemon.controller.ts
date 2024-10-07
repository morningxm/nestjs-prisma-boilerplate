import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ApiMyResponse } from '@/shared/decorators';

import { PokemonService } from './pokemon.service';

@Controller('pokemon')
@ApiTags('Pokemon')
export class PokemonController {
  constructor(private readonly service: PokemonService) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Get a Pokemon',
  })
  @ApiMyResponse()
  async getPokemon(@Param('id') id: number) {
    return await this.service.getPokemon(+id);
  }
}

import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class PokemonService {
  constructor(
    private readonly httpService: HttpService,
    private readonly logger: Logger,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async getPokemon(id: number) {
    const cachedData = await this.cacheService.get<{ name: string }>(id.toString());
    if (cachedData) {
      this.logger.log(`returning data from cache: ${cachedData.name}`);
      return `${cachedData.name}`;
    }

    const { data } = await this.httpService.axiosRef.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    await this.cacheService.set(id.toString(), data);

    return await `${data.name}`;
  }
}

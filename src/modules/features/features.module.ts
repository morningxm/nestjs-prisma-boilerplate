import { Module } from '@nestjs/common';

import { BookModule } from './book/book.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { EntityModule } from './entity/entity.module';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [BookModule, BookmarkModule, PokemonModule, EntityModule],
})
export class FeaturesModule {}

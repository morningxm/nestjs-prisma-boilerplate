import { Module } from '@nestjs/common';

import { CoreModule } from '@/modules/core/core.module';

import { EntityController } from './entity.controller';
import { EntityService } from './entity.service';

@Module({
  imports: [CoreModule],
  controllers: [EntityController],
  providers: [EntityService],
})
export class EntityModule {}

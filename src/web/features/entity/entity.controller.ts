import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ApiMyResponse } from '@/shared/decorators';
import { EntityDto } from '@/shared/dtos';

import { EntityService } from './entity.service';

@Controller('entities')
@ApiTags('Entity')
export class EntityController {
  constructor(private readonly entityService: EntityService) {}

  @Get()
  @ApiOperation({ summary: 'Get all entities' })
  @ApiMyResponse({ status: 200, type: [EntityDto] })
  async getAll() {
    return this.entityService.find({});
  }
}

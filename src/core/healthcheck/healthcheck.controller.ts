import { Controller, Get } from '@nestjs/common';

import { InternalUrl, ResponseMessage } from '@/shared/enums';

@Controller(InternalUrl.HEALTH_CHECK)
export class HealthcheckController {
  @Get()
  index() {
    return {
      message: ResponseMessage.OK,
    };
  }
}

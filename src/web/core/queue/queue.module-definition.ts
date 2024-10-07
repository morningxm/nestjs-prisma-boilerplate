import { ConfigurableModuleBuilder } from '@nestjs/common';

import { QueueModuleOptions } from './queue.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN, OPTIONS_TYPE } =
  new ConfigurableModuleBuilder<QueueModuleOptions>().build();

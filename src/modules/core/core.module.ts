import { Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { FLOW, QUEUE } from '@/shared/enums';

import { DatabaseModule } from './database/database.module';
import { QueueModule } from './queue/queue.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    DatabaseModule,
    UploadModule,
    QueueModule.register({
      queues: [QUEUE.AUTH_QUEUE],
      flows: [FLOW.AUTH_FLOW],
    }),
  ],
  providers: [Logger, ConfigService],
  exports: [DatabaseModule, UploadModule, QueueModule, Logger, ConfigService],
})
export class CoreModule {}

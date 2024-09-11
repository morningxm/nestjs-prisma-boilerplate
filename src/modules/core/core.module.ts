import { Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [DatabaseModule, UploadModule],
  providers: [Logger, ConfigService],
  exports: [DatabaseModule, UploadModule, Logger, ConfigService],
})
export class CoreModule {}

import { Logger, Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [DatabaseModule, UploadModule],
  providers: [Logger],
  exports: [DatabaseModule, UploadModule, Logger],
})
export class CoreModule {}

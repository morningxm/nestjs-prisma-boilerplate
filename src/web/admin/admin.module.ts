import { Module } from '@nestjs/common';

import { AdminUserModule } from './admin-user/admin-user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AdminUserModule, AuthModule],
})
export class AdminModule {}

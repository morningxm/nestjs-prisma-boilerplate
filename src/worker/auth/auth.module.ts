import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { CoreModule } from '@/core/core.module';
import { ENV } from '@/shared/enums';

import { AuthProcessor } from './processors/auth.processor';

@Module({
  imports: [
    CoreModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get(ENV.SECRET),
          signOptions: { expiresIn: configService.get(ENV.TOKEN_EXPIRE_IN) },
        };
      },
    }),
  ],
  providers: [AuthProcessor],
  controllers: [],
  exports: [],
})
export class AuthModule {}

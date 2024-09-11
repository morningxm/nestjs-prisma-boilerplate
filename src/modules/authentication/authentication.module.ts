import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { DatabaseModule } from '@/modules/core/database/database.module';
import { UserModule } from '@/modules/user/user.module';
import { ENV } from '@/shared/enums';

import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';

@Module({})
export class AuthenticationModule {
  static forRoot(strategy?: 'jwt' | 'OAuth' | 'Facebook'): DynamicModule {
    strategy = strategy || 'jwt';

    const strategyProvider = {
      provide: 'Strategy',
      useFactory: async (authService: AuthenticationService, configService: ConfigService) => {
        const Strategy = (await import(`./passports/${strategy}.strategy`)).default;

        return new Strategy(authService, configService.get(ENV.SECRET));
      },
      inject: [AuthenticationService, ConfigService],
    };

    return {
      module: AuthenticationModule,
      imports: [DatabaseModule, UserModule],
      providers: [AuthenticationService, strategyProvider],
      controllers: [AuthenticationController],
      exports: [AuthenticationService, strategyProvider],
    };
  }
}

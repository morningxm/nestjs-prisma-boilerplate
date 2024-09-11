import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PrismaService } from '@/modules/core/database/prisma.service';
import { UserModule } from '@/modules/user/user.module';
import { UserService } from '@/modules/user/user.service';
import { ENV } from '@/shared/enums';

import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';

@Module({
  // providers: [ConfigService, PrismaService, UserService, AuthenticationService],
  // controllers: [AuthenticationController],
})
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
      imports: [UserModule],
      providers: [ConfigService, PrismaService, UserService, AuthenticationService, strategyProvider],
      controllers: [AuthenticationController],
      exports: [strategyProvider],
    };
  }
}

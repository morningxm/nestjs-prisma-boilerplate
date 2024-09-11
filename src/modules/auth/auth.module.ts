import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from '@/modules/user/user.module';
import { ENV } from '@/shared/enums';

import { CoreModule } from '../core/core.module';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';

@Module({})
export class AuthModule {
  static forRoot(): DynamicModule {
    const JwtStrategy = {
      provide: 'Strategy',
      useFactory: async (userService: UserService, configService: ConfigService) => {
        const JwtStrategy = (await import('./strategies/jwt.strategy')).JwtStrategy;
        return new JwtStrategy(userService, configService.get(ENV.SECRET));
      },
      inject: [UserService, ConfigService],
    };
    return {
      module: AuthModule,
      imports: [
        CoreModule,
        PassportModule,
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
        UserModule,
      ],
      providers: [AuthService, LocalStrategy, JwtStrategy],
      controllers: [AuthController],
      exports: [AuthService, LocalStrategy, JwtStrategy],
    };
  }
}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { CoreModule } from '@/modules/core/core.module';
import { UserModule } from '@/modules/user/user.module';
import { ENV } from '@/shared/enums';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthProcessor } from './processors/auth.processor';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
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
  providers: [AuthService, LocalStrategy, JwtStrategy, AuthProcessor],
  controllers: [AuthController],
  exports: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}

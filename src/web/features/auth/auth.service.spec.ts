import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';

import { CoreModule } from '@/core/core.module';
import { ENV } from '@/shared/enums';

import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
      ],
      providers: [AuthService, LocalStrategy, JwtStrategy],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to validate user', () => {
    expect(service.validateUser({ email: 'hello@hello.com', password: 'hello' })).toBeDefined();
  });

  it('should be able to login', async () => {
    const payload = await service.login({
      id: '1',
      email: 'hello@hello.com',
    });
    expect(payload.token).toBeDefined();
    expect(jwtService.decode(payload.token).email).toEqual('hello@hello.com');
  });
});

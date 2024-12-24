import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';

import { ENV, GENDER } from '@/shared/enums';
import { CoreModule } from '@/web/core/core.module';

import { AdminUserModule } from '../admin-user/admin-user.module';
import { AdminUserService } from '../admin-user/admin-user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

describe('AuthController', () => {
  let controller: AuthController;
  let jwtService: JwtService;
  let adminUserService: AdminUserService;

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
        AdminUserModule,
      ],
      providers: [AuthService, LocalStrategy, JwtStrategy],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    jwtService = module.get(JwtService);
    adminUserService = module.get(AdminUserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be able to login', async () => {
    const payload = await controller.login({
      id: '1',
      email: 'hello@hello.com',
    });
    expect(payload).toBeDefined();
    expect(jwtService.decode(payload.token).email).toEqual('hello@hello.com');
  });

  it('should be able to signup', async () => {
    jest.spyOn(adminUserService, 'save').mockImplementationOnce(async () => ({
      id: '1',
      email: 'hello@hello.com',
      password: 'hello',
      name: 'hello',
      gender: GENDER.MALE,
    }));
    const payload = await controller.signup({
      email: 'hello@hello.com',
      password: 'hello',
      name: 'hello',
    });
    expect(payload).toBeDefined();
    expect(payload.email).toEqual('hello@hello.com');
  });
});

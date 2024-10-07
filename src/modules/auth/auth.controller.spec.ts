import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { Queue } from 'bullmq';

import { CoreModule } from '@/modules/core/core.module';
import { UserModule } from '@/modules/user/user.module';
import { UserService } from '@/modules/user/user.service';
import { ENV, GENDER } from '@/shared/enums';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

describe('AuthController', () => {
  let controller: AuthController;
  let jwtService: JwtService;
  let userService: UserService;

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
        UserModule,
      ],
      providers: [AuthService, LocalStrategy, JwtStrategy],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    jwtService = module.get(JwtService);
    userService = module.get(UserService);
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
    jest.spyOn(userService, 'save').mockImplementationOnce(async () => ({
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

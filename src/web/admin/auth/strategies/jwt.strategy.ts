import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ENV } from '@/shared/enums';
import { AdminUserService } from '@/web/admin/admin-user/admin-user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: AdminUserService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(ENV.ADMIN_SECRET),
    });
  }

  async validate(payload: Pick<User, 'email'>) {
    return await this.userService.findByEmail(payload.email);
  }
}

import { Injectable, Logger, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from '@/features/auth/auth.service';

import { ENV, LOGGER_CONTEXT } from '../enums';
import { Socket } from '../interfaces';

@Injectable()
export class SocketAuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly logger: Logger,
  ) {}

  async use(socket: Socket, next: (err?: unknown) => void): Promise<void> {
    const token =
      typeof socket.handshake?.query?.token === 'string'
        ? socket.handshake?.query?.token
        : socket.handshake?.headers?.authorization?.split(' ')[1];

    if (!token) {
      return next(new UnauthorizedException());
    }

    try {
      const secret = this.configService.get(ENV.SECRET);
      const payload = this.jwtService.verify(token, {
        secret,
      });
      socket.user = await this.authService.findUserByEmail(payload.email); // Attach user info for further usage
      socket.id = socket.user?.id ?? socket.id;
      next();
    } catch (err) {
      this.logger.error(err, '', LOGGER_CONTEXT.GATEWAYS);
      next(new UnauthorizedException());
    }
  }
}

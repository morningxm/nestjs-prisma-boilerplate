import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Socket } from 'socket.io';

import { APP_ENV, ENV, LOGGER_CONTEXT } from '../enums';

@Catch()
export class WsExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const client = host.switchToWs().getClient<Socket>();
    if (exception instanceof UnauthorizedException) {
      client.emit(
        'unauthorized',
        this.configService.get<string>(ENV.APP_ENV) === APP_ENV.DEV && {
          message: exception,
        },
      );
      client.disconnect();
    }

    this.logger.error(exception, '', LOGGER_CONTEXT.GATEWAYS);
  }
}

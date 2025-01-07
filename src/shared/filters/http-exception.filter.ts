import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';

import { APP_ENV, ENV, LOGGER_CONTEXT } from '../enums';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = exception instanceof Error ? exception.message : 'Internal Server Error';

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      const prismaCode = exception.code?.toLowerCase() || '';

      switch (prismaCode) {
        case 'p2002':
          status = HttpStatus.CONFLICT;
          message = 'Unique constraint failed';
          break;
        case 'p2025':
          status = HttpStatus.NOT_FOUND;
          message = 'Not Found';
          break;
      }
    }
    const result = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    };

    if (exception['response']) {
      result['body'] = exception['response'];
    }

    if (this.configService.get<string>(ENV.APP_ENV) === APP_ENV.DEV) {
      result['error'] = exception;
    }

    this.logger.error(exception, '', LOGGER_CONTEXT.WEB);

    response.status(status).json(result);
  }
}

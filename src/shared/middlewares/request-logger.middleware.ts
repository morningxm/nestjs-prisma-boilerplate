import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {}

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      const statusCode: number = res.statusCode;
      if (statusCode >= 400) {
        this.logger.error(`[${req.method}] ${req.url} - ${statusCode}`);
      } else {
        this.logger.log(`[${req.method}] ${req.url} - ${statusCode}`);
      }
    });

    next();
  }
}

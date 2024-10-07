import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import 'reflect-metadata';
import { format, transports } from 'winston';
import 'winston-daily-rotate-file';

import { ENV, LOGGER_TYPE } from './shared/enums';
import { WorkerModule } from './worker/worker.module';

async function bootstrap() {
  const worker = await NestFactory.create(WorkerModule);

  const configService = worker.get(ConfigService);

  if (configService.get(ENV.LOGGER) == LOGGER_TYPE.WINSTON) {
    worker.useLogger(
      WinstonModule.createLogger({
        transports: [
          new transports.DailyRotateFile({
            filename: `logs/%DATE%-error.log`,
            level: 'error',
            format: format.combine(format.timestamp(), format.json()),
            datePattern: 'YYYY-MM-DD',
            zippedArchive: false,
            maxFiles: '30d',
          }),
          new transports.DailyRotateFile({
            filename: `logs/%DATE%-combined.log`,
            format: format.combine(format.timestamp(), format.json()),
            datePattern: 'YYYY-MM-DD',
            zippedArchive: false,
            maxFiles: '30d',
          }),
          new transports.Console({
            format: format.combine(
              format.cli(),
              format.splat(),
              format.timestamp(),
              format.printf((info) => {
                return `${info.timestamp} ${info.level}: ${info.message}`;
              }),
            ),
          }),
        ],
      }),
    );
  }

  const port = configService.get(ENV.APP_PORT);
  await worker.listen(6000);

  const logger = new Logger();
  logger.log(`Application is running on: ${await worker.getUrl()}`);
}
bootstrap();

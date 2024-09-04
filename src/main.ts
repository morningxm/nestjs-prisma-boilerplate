import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { WinstonLogger, WinstonModule } from 'nest-winston';
import 'reflect-metadata';
import { format, transports } from 'winston';
import 'winston-daily-rotate-file';

import { AppModule } from './app.module';
import { ENV, LOGGER_TYPE } from './enums/env.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  if (configService.get(ENV.LOGGER) == LOGGER_TYPE.WINSTON) {
    app.useLogger(
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

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const port = configService.get(ENV.APP_PORT);

  await app.listen(port);

  const logger = new Logger();
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

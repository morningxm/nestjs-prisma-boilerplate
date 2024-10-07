import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import 'reflect-metadata';
import { format, transports } from 'winston';
import 'winston-daily-rotate-file';

import { ENV, LOGGER_TYPE } from './shared/enums';
import { setupSwagger } from './swagger';
import { WebModule } from './web/web.module';

async function bootstrap() {
  const web = await NestFactory.create(WebModule);

  const configService = web.get(ConfigService);

  if (configService.get(ENV.LOGGER) == LOGGER_TYPE.WINSTON) {
    web.useLogger(
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

  web.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  setupSwagger(web);

  const port = configService.get(ENV.APP_PORT);
  await web.listen(port);

  const logger = new Logger();
  logger.log(`Application is running on: ${await web.getUrl()}`);
}
bootstrap();

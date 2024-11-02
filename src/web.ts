import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as chalk from 'chalk';
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

  if (configService.get<string>(ENV.LOGGER_TYPE) === LOGGER_TYPE.WINSTON) {
    const maxFiles = configService.get(ENV.LOGGER_MAX_FILES);
    const datePattern = 'YYYY-MM-DD';
    web.useLogger(
      WinstonModule.createLogger({
        transports: [
          new transports.DailyRotateFile({
            filename: `logs/%DATE%-web-error.log`,
            level: 'error',
            format: format.combine(
              format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
              format.json(),
            ),
            datePattern: datePattern,
            zippedArchive: false,
            maxFiles,
          }),
          new transports.DailyRotateFile({
            filename: `logs/%DATE%-web-combined.log`,
            format: format.combine(
              format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
              format.json(),
            ),
            datePattern: datePattern,
            zippedArchive: false,
            maxFiles,
          }),
          new transports.Console({
            format: format.combine(
              // format.cli(),
              // format.splat(),
              format.colorize({ all: true }),
              format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
              format.printf((info) => {
                return `${chalk.green(`[Nest] ${process.pid}`)}\t${info.timestamp}\t${info.level} [${chalk.yellow(info.context || 'App')}] ${info.message}${info.level.match('error') ? '\n' + info.stack : ''}`;
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

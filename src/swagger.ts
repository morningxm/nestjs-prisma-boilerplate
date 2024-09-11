import { type INestApplication } from '@nestjs/common/interfaces';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { ENV } from './shared/enums';

export function setupSwagger(app: INestApplication) {
  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle(configService.get(ENV.SWAGGER_TITLE))
    .setDescription(configService.get(ENV.SWAGGER_DESCRIPTION))
    .setVersion(configService.get(ENV.SWAGGER_VERSION))
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(configService.get(ENV.SWAGGER_ENDPOINT), app, document);
}

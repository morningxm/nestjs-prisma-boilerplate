import { type INestApplication } from '@nestjs/common/interfaces';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { ENV } from './shared/enums';

export function setupSwagger(app: INestApplication) {
  const configService = app.get(ConfigService);

  const title = configService.get(ENV.SWAGGER_TITLE);
  const description = configService.get(ENV.SWAGGER_DESCRIPTION);
  const version = configService.get(ENV.SWAGGER_VERSION);
  const favicon = configService.get(ENV.SWAGGER_FAVICON);

  const config = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .addBearerAuth()
    .build();
  console.log(favicon, 'favicon');
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(configService.get(ENV.SWAGGER_ENDPOINT), app, document, {
    customCss: ".topbar-wrapper { content:url('/assets/favicon.svg'); height:100px; }",
    customSiteTitle: title,
    customfavIcon: favicon,
  });
}

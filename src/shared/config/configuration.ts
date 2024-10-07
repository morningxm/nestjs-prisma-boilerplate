import { ENV } from '@/shared/enums';

export const Configuration = () => ({
  [ENV.APP_PORT]: parseInt(process.env.APP_PORT) || 3000,
  [ENV.SECRET]: process.env.SECRET || 'SECRET',
  [ENV.TOKEN_EXPIRE_IN]: process.env.TOKEN_EXPIRE_IN || '1h',

  [ENV.DATABASE_URL]: process.env.DATABASE_URL,

  [ENV.CACHE_MODE]: process.env.CACHE_MODE || 'redis',
  [ENV.CACHE_TTL]: process.env.CACHE_TTL || 30,

  [ENV.REDIS_HOST]: process.env.REDIS_HOST || '127.0.0.1',
  [ENV.REDIS_PORT]: parseInt(process.env.REDIS_PORT) || 6379,

  [ENV.LOGGER_TYPE]: parseInt(process.env.LOGGER) || 'winston',

  [ENV.SWAGGER_TITLE]: parseInt(process.env.SWAGGER_TITLE) || 'Nest.js boilerplate',
  [ENV.SWAGGER_DESCRIPTION]: parseInt(process.env.SWAGGER_DESCRIPTION) || 'Nest.js boilerplate',
  [ENV.SWAGGER_VERSION]: parseInt(process.env.SWAGGER_VERSION) || '1.0',
  [ENV.SWAGGER_FAVICON]: parseInt(process.env.SWAGGER_FAVICON) || '/assets/favicon.ico',
  [ENV.SWAGGER_ENDPOINT]: parseInt(process.env.SWAGGER_ENDPOINT) || '/api-docs',
});

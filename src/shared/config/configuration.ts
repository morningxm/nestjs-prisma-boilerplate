import { APP_ENV, ENV } from '@/shared/enums';

export const Configuration = () => ({
  [ENV.APP_NAME]: process.env.APP_NAME || 'pivotal-backend',
  [ENV.APP_ENV]: process.env.APP_ENV || APP_ENV.DEV,
  [ENV.IS_PRD]: process.env.APP_ENV === APP_ENV.PRD,
  [ENV.IS_TEST]: process.env.APP_ENV === APP_ENV.TEST,
  [ENV.IS_STG]: process.env.APP_ENV === APP_ENV.STG,
  [ENV.IS_DEV]: process.env.APP_ENV === APP_ENV.DEV,
  [ENV.APP_PORT]: parseInt(process.env.APP_PORT) || 3000,
  [ENV.SECRET]: process.env.SECRET || 'SECRET',
  [ENV.TOKEN_EXPIRE_IN]: process.env.TOKEN_EXPIRE_IN || '1h',

  [ENV.DATABASE_URL]: process.env.DATABASE_URL,

  [ENV.CACHE_MODE]: process.env.CACHE_MODE || 'redis',
  [ENV.CACHE_TTL]: process.env.CACHE_TTL || 30,

  [ENV.REDIS_URL]: process.env.REDIS_URL || 'redis://127.0.0.1:6379',

  [ENV.LOGGER_TYPE]: parseInt(process.env.LOGGER) || 'winston',

  [ENV.SWAGGER_TITLE]: parseInt(process.env.SWAGGER_TITLE) || 'Nest.js boilerplate',
  [ENV.SWAGGER_DESCRIPTION]: parseInt(process.env.SWAGGER_DESCRIPTION) || 'Nest.js boilerplate',
  [ENV.SWAGGER_VERSION]: parseInt(process.env.SWAGGER_VERSION) || '1.0',
  [ENV.SWAGGER_FAVICON]: parseInt(process.env.SWAGGER_FAVICON) || '/assets/favicon.ico',
  [ENV.SWAGGER_ENDPOINT]: parseInt(process.env.SWAGGER_ENDPOINT) || '/api-docs',
});

export enum ENV {
  APP_PORT = 'APP_PORT',
  SECRET = 'SECRET',
  ADMIN_SECRET = 'ADMIN_SECRET',
  TOKEN_EXPIRE_IN = 'TOKEN_EXPIRE_IN',

  DATABASE_URL = 'DATABASE_URL',

  CACHE_MODE = 'CACHE_MODE',
  CACHE_TTL = 'CACHE_TTL',

  REDIS_HOST = 'REDIS_HOST',
  REDIS_PORT = 'REDIS_PORT',

  LOGGER_TYPE = 'LOGGER_TYPE',
  LOGGER_MAX_FILES = 'LOGGER_MAX_FILES',

  SWAGGER_TITLE = 'SWAGGER_TITLE',
  SWAGGER_DESCRIPTION = 'SWAGGER_DESCRIPTION',
  SWAGGER_VERSION = 'SWAGGER_VERSION',
  SWAGGER_FAVICON = 'SWAGGER_FAVICON',
  SWAGGER_ENDPOINT = 'SWAGGER_ENDPOINT',
}

export enum CACHE_TYPE {
  REDIS = 'redis',
  MEMORY = 'memory',
}

export enum LOGGER_TYPE {
  WINSTON = 'winston',
}

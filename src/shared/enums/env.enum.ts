export enum ENV {
  APP_PORT = 'APP_PORT',
  SECRET = 'SECRET',
  TOKEN_EXPIRE_IN = 'TOKEN_EXPIRE_IN',

  DATABASE_URL = 'DATABASE_URL',

  CACHE_MODE = 'CACHE_MODE',
  CACHE_TTL = 'CACHE_TTL',

  REDIS_HOST = 'REDIS_HOST',
  REDIS_PORT = 'REDIS_PORT',

  LOGGER = 'LOGGER',
}

export enum CACHE_TYPE {
  REDIS = 'redis',
  MEMORY = 'memory',
}

export enum LOGGER_TYPE {
  WINSTON = 'winston',
}

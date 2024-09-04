export enum ENV {
  APP_PORT = 'APP_PORT',
  SECRET = 'SECRET',

  MONGODB_HOST = 'MONGODB_HOST',
  MONGODB_PORT = 'MONGODB_PORT',
  MONGODB_NAME = 'MONGODB_NAME',

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

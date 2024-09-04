import { ENV } from '@/enums/env.enum';

export const Configuration = () => ({
  [ENV.APP_PORT]: parseInt(process.env.APP_PORT) || 3000,
  [ENV.SECRET]: process.env.SECRET || 'SECRET',

  [ENV.DATABASE_URL]: process.env.DATABASE_URL,

  [ENV.CACHE_MODE]: process.env.CACHE_MODE || 'redis',
  [ENV.CACHE_TTL]: process.env.CACHE_TTL || 30,

  [ENV.REDIS_HOST]: process.env.REDIS_HOST || '127.0.0.1',
  [ENV.REDIS_PORT]: parseInt(process.env.REDIS_PORT) || 6379,

  [ENV.LOGGER]: parseInt(process.env.LOGGER) || 'winston',
});

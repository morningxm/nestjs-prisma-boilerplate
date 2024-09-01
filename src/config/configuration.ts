import { ENV } from '@/enum/env.enum';

export const Configuration = () => ({
  [ENV.APP_PORT]: parseInt(process.env.APP_PORT) || 3000,
  [ENV.SECRET]: process.env.SECRET || 'SECRET',

  [ENV.MONGODB_HOST]: process.env.MONGODB_HOST || '127.0.0.1',
  [ENV.MONGODB_PORT]: parseInt(process.env.MONGODB_PORT) || 27017,
  [ENV.MONGODB_NAME]: process.env.MONGODB_NAME || 'bookmarksy',

  [ENV.CACHE_MODE]: process.env.CACHE_MODE || 'redis',
  [ENV.CACHE_TTL]: process.env.CACHE_TTL || 30,

  [ENV.REDIS_HOST]: process.env.REDIS_HOST || '127.0.0.1',
  [ENV.REDIS_PORT]: parseInt(process.env.REDIS_PORT) || 6379,
});

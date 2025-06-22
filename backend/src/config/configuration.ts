// src/config/configuration.ts
import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  url: process.env.DATABASE_URL,
  type: 'postgresql',
  logging: process.env.NODE_ENV === 'development',
}));

export const redisConfig = registerAs('redis', () => ({
  url: process.env.REDIS_URL,
}));
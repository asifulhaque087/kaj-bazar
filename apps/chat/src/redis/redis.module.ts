// apps/chat/src/redis/redis.module.ts
import { Module, Global } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_PUBLISHER, REDIS_SUBSCRIBER } from './redis.constants';

@Global()
@Module({
  providers: [
    {
      provide: REDIS_PUBLISHER,
      useFactory: () => new Redis({ host: process.env.REDIS_HOST || 'localhost', port: 6379 }),
    },
    {
      provide: REDIS_SUBSCRIBER,
      useFactory: () => new Redis({ host: process.env.REDIS_HOST || 'localhost', port: 6379 }),
    },
  ],
  exports: [REDIS_PUBLISHER, REDIS_SUBSCRIBER],
})
export class RedisModule {}
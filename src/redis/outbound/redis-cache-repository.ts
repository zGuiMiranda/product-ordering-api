import { InjectRedis } from '@nestjs-modules/ioredis';
import { RedisCacheRepositoryInterface } from '@shared/interface/outbound/redis-cache-repository-interface';
import { Redis } from 'ioredis';

export class RedisCacheRepository
  implements RedisCacheRepositoryInterface<any, string>
{
  private TTL = process.env.REDIS_TTL_SECONDS;
  constructor(@InjectRedis() private readonly redis: Redis) {}
  save(key: string, data: any): Promise<any> {
    return this.redis.set(key, JSON.stringify(data), 'EX', this.TTL);
  }
  async get(key: string): Promise<string> {
    return this.redis.get(key);
  }
}

import {
  RedisClusterOptions,
  RedisModuleOptions,
  RedisSingleOptions,
} from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClusterNode, ClusterOptions, RedisOptions } from 'ioredis';

@Injectable()
export class RedisConfigService {
  constructor(private readonly configService: ConfigService) {}

  public redisConfiguration(): RedisSingleOptions {
    return {
      type: 'single',
      options: { password: this.configService.get<string>('REDIS_PASSWORD') },
      url: this.configService.get<string>('REDIS_URL'),
    };
  }
}

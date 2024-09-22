import { Module } from '@nestjs/common';
import { RedisCacheRepository } from './outbound/redis-cache-repository';
import { RedisModule as RedisCacheModule } from '@nestjs-modules/ioredis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisConfigService } from './redis.config.service';

@Module({
  imports: [
    ConfigModule.forRoot(),

    RedisCacheModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return new RedisConfigService(configService).redisConfiguration();
      },
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
  ],
  providers: [RedisCacheRepository],
  exports: [RedisCacheRepository],
})
export class RedisModule {}

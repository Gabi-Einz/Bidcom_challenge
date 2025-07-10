import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: Redis.Redis;
  onModuleInit() {
    this.client = new Redis.Redis({
      host: process.env.REDIS_HOST || 'redis',
      port: Number(process.env.REDIS_PORT),
    });
  }
  onModuleDestroy() {
    this.client.quit();
  }
  async set(key: string, otp: string, ttlInSeconds: number): Promise<void> {
    await this.client.set(key, otp, 'EX', ttlInSeconds);
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }
  async delete(key: string): Promise<number> {
    return this.client.del(key);
  }
}

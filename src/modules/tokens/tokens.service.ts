import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { CreateTokenInterface } from './interfaces';

@Injectable()
export class TokensService {
  private readonly randomToken = () =>
    Math.floor(1000000 + Math.random() * 900000).toString();
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async generateToken({ userId, type, ttl=900000 }: CreateTokenInterface) {
    const token = this.randomToken();
    return await this.cacheManager.set(`token:${token}:user:${userId}`, { userId, type, token }, ttl);
  }

  
}

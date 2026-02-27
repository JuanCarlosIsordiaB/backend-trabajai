import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { randomInt } from 'crypto';
import { CreateTokenInterface, PayloadTokenInterface, RevokeTokenInterface } from './interfaces';
import { AuthorizationToken } from 'src/common/enum';

@Injectable()
export class TokensService {
  private static readonly DEFAULT_TTL_MS = 15 * 60 * 1000; // 15 minutos
  private static readonly TOKEN_MIN = 100000;
  private static readonly TOKEN_MAX = 999999;

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  private generateCode(): string {
    return randomInt(TokensService.TOKEN_MIN, TokensService.TOKEN_MAX + 1).toString();
  }

  private cacheKey(type: AuthorizationToken, userId: string): string {
    return `token:${type}:user:${userId}`;
  }

  async generateToken({ userId, type, ttl = TokensService.DEFAULT_TTL_MS }: CreateTokenInterface): Promise<PayloadTokenInterface> {
    try {
      const token = this.generateCode();
      const payload: PayloadTokenInterface = { userId, type, token };
      await this.cacheManager.set(this.cacheKey(type, userId), payload, ttl);
      return payload;
    } catch (error) {
      throw new InternalServerErrorException('Error al generar el token');
    }
  }

  async validateToken({ userId, type, token }: PayloadTokenInterface): Promise<PayloadTokenInterface> {
    try {
      const payload: PayloadTokenInterface | undefined = await this.cacheManager.get<PayloadTokenInterface>(this.cacheKey(type, userId));
      if (!payload || payload.token !== token) {
        throw new UnauthorizedException('Token inválido o expirado');
      }
      await this.revokeToken({ userId, type });
      return payload;
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      throw new InternalServerErrorException('Error al validar el token');
    }
  }

  async revokeToken({ userId, type }: RevokeTokenInterface): Promise<boolean> {
    try {
      const key = this.cacheKey(type, userId);
      const exists = await this.cacheManager.get(key);
      if (exists) {
        await this.cacheManager.del(key);
        return true;
      }
      return false;
    } catch (error) {
      throw new InternalServerErrorException('Error al revocar el token');
    }
  }
}

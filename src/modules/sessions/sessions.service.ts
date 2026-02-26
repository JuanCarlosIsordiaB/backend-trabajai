import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateSessionInterface,
  GetAllSessionsInterface,
  GetSessionInterface,
  UpdateSessionInterface,
} from './interfaces';

@Injectable()
export class SessionsService {
  constructor(private readonly prisma: PrismaService) {}

  async createSession({
    id,
    userId,
    refreshToken,
    userAgent,
    ipAddress,
    location,
    isActive,
    expiresAt,
  }: CreateSessionInterface) {
    return await this.prisma.session.create({
      data: {
        id,
        userId,
        refreshToken,
        userAgent,
        ipAddress,
        location,
        isActive,
        expiresAt,
      },
    });
  }

  async getAllSessions({ userId }: GetAllSessionsInterface) {
    return await this.prisma.session.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        userId: true,
        userAgent: true,
        createdAt: true,
        lastUsedAt: true,
      },
    });
  }

  async findOneSession({ id, userId }: GetSessionInterface) {
    const session = await this.prisma.session.findUnique({
      where: {
        id,
        userId,
      },
    });
    if (!session) {
      throw new NotFoundException('Session not found');
    }
    return session;
  }

  async updateSession({
    id,
    userId,
    refreshToken,
    userAgent,
    ipAddress,
    location,
    isActive,
    expiresAt,
  }: UpdateSessionInterface) {
     await this.findOneSession({ id, userId });
    return await this.prisma.session.update({
      where: {
        id,
        userId,
      },
      data: {
        refreshToken,
        userAgent,
        ipAddress,
        location,
        isActive,
        expiresAt,
      },
    });
  }

  async deleteSession({ id, userId }: GetSessionInterface) {
    await this.findOneSession({ id, userId });
    return await this.prisma.session.delete({
      where: {
        id,
        userId,
      },
    });
  }

  async deleteAllSessions({ userId }: GetAllSessionsInterface) {
    return await this.prisma.session.deleteMany({
      where: {
        userId,
      },
    });
  }
}

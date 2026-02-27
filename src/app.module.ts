import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { createKeyv } from '@keyv/redis';
import { PrismaModule } from './modules/prisma/prisma.module';
import { envs } from './config/envs';
import { UsersModule } from './modules/users/users.module';
import { TestModule } from './modules/test/test.module';
import { BcryptModule } from './modules/bcrypt/bcrypt.module';
import { SessionsModule } from './modules/sessions/sessions.module';
import { TokensModule } from './modules/tokens/tokens.module';
import { EmailsModule } from './modules/emails/emails.module';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: () => ({
        stores: [createKeyv(envs.REDIS_URL)],
      }),
    }),
    PrismaModule,
    UsersModule,
    TestModule,
    BcryptModule,
    SessionsModule,
    TokensModule,
    EmailsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

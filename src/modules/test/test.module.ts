import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { UsersModule } from '../users/users.module';
import { BcryptModule } from '../bcrypt/bcrypt.module';
import { TokensModule } from '../tokens/tokens.module';

@Module({
  imports: [UsersModule, BcryptModule, TokensModule],
  controllers: [TestController]
})
export class TestModule {}

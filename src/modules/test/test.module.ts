import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { UsersModule } from '../users/users.module';
import { BcryptModule } from '../bcrypt/bcrypt.module';

@Module({
  imports: [UsersModule, BcryptModule],
  controllers: [TestController]
})
export class TestModule {}

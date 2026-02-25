import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import type { CreateUserInterface } from '../users/interfaces/user.interface';
import { BcryptService } from '../bcrypt/bcrypt.service';

@Controller('test')
export class TestController {
  constructor(private readonly bcryptService: BcryptService) {}

  @Post()
  async test(@Body() data: any) {
    const password = '1234';
    const hashedPassword = '$2b$10$wXyE.g/MDtALQfriVkQQeudF4gGBm2uFUDBdEH5pc8zP4oJ5t9Zne';
    return await this.bcryptService.compare(password, hashedPassword);
  }
}

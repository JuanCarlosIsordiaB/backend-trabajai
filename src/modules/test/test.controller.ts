import { Body, Controller, Delete, Post } from '@nestjs/common';
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

  @Post('create-user')
  async createUser(@Body() data: CreateUserInterface) {
    const { name, email, password } = data;
    const hashedPassword = await this.bcryptService.hash(password);
    return {
      name,
      email,
      password: hashedPassword,
    };
  }

  @Delete('delete-user')
  async deleteUser() {
    const userr = this.deleteUser();
    return userr;
  }
}

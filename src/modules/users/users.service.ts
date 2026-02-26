import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateUserInterface,
  GetUserInterface,
  UpdateUserInterface,
} from './interfaces';
import { BcryptService } from '../bcrypt/bcrypt.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bcrypt: BcryptService,
  ) {}

  private async validateEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: { email: true },
    });
    if (!user) return;
    throw new BadRequestException('Email already exists');
  }

  async create({
    name,
    lastName,
    avatar,
    email,
    backupEmail,
    phone,
    password,
    country,
    language,
    emailConfirm,
    backupEmailConfirm,
    phoneConfirm,
    twoFactorEnabled,
    twoFactorSecret,
    status,
    authProvider,
  }: CreateUserInterface) {
    await this.validateEmail(email);

    return await this.prisma.user.create({
      data: {
        name,
        lastName,
        avatar,
        email,
        backupEmail,
        phone,
        password: await this.bcrypt.hash(password),
        country,
        language,
        emailConfirm,
        backupEmailConfirm,
        phoneConfirm,
        twoFactorEnabled,
        twoFactorSecret,
        status,
        authProvider,
      },
    });
  }

  async update({ id, password, email, ...data }: UpdateUserInterface) {
    await this.findOne({ id });
    if (email) await this.validateEmail(email);
    return await this.prisma.user.update({
      where: { id },
      data: {
        ...data,
        password: password && (await this.bcrypt.hash(password)),
        email: email && email,
      },
    });
  }

  async findOne({ id, email }: GetUserInterface) {
    if (!id && !email) throw new InternalServerErrorException('findOne requires id or email');
    const user = await this.prisma.user.findUnique({
      where: id ? { id } : { email },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async delete(id: string) {
    await this.findOne({ id });
    return await this.prisma.user.delete({ where: { id } });
  }
}

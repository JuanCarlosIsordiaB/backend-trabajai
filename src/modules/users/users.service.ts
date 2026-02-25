import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInterface } from './interfaces';
import { BcryptService } from '../bcrypt/bcrypt.service';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService, private readonly bcrypt: BcryptService) {}


    private async validateEmail(email: string) {
        const user = await this.prisma.user.findUnique({
            where: { email },
            select: {email: true }
        });
        if(!user) return
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
                authProvider
            }
        });

    }

    async update(){

    }
    async findOne(){

    }
    async delete(){

    }

}

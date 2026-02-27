import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { TokensService } from '../tokens/tokens.service';
import { AuthorizationToken } from 'src/common/enum';
import { EmailsService } from '../emails/emails.service';

const TEST_USER_ID = '9398ac2c-1644-488a-885b-307029e76ee8';

@Controller('test')
export class TestController {
  constructor(
    private readonly tokenService: TokensService,
    private readonly emailsService: EmailsService,
  ) {}

  @Post('generate')
  async generate() {
    return await this.tokenService.generateToken({
      userId: TEST_USER_ID,
      type: AuthorizationToken.CONFIRM_EMAIL,
    });
  }

  @Get('validate/:token')
  async validate(@Param('token') token: string) {
    return await this.tokenService.validateToken({
      userId: TEST_USER_ID,
      type: AuthorizationToken.CONFIRM_EMAIL,
      token,
    });
  }

  @Get('send-email')
  async sendEmail() {
    return await this.emailsService.sendEmail({
      to: ['juancarlosisordiab@gmail.com'],
      subject: 'Test Email',
      html: '<h1>This is a test email</h1>',
    });
  }

}

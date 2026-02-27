import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { TokensService } from '../tokens/tokens.service';
import { AuthorizationToken } from 'src/common/enum';

const TEST_USER_ID = '9398ac2c-1644-488a-885b-307029e76ee8';

@Controller('test')
export class TestController {
  constructor(private readonly tokenService: TokensService) {}

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
}
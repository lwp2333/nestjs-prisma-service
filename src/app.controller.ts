import { Controller, Get, Render } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * 主页
   */
  @ApiTags('root')
  @Get()
  @Render('index')
  @ApiOkResponse({
    status: 200,
    type: String,
    description: '主页',
  })
  getHello(): { message: string } {
    return {
      message: this.appService.getHello(),
    };
  }
}

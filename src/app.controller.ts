import { Controller, Get, Render } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { AppService } from './app.service'

interface RootType {
  message: string
}

@ApiTags('root')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * 主页
   */
  @Get()
  @Render('index')
  @ApiResponse({ status: 200, type: String, description: '' })
  async root(): Promise<RootType> {
    const message = this.appService.getHello()
    return {
      message,
    }
  }
}

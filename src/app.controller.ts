import { Controller, Get, Render } from '@nestjs/common'
import { AppService } from './app.service'

interface resType {
  message: string
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  root(): resType {
    const message = this.appService.getHello()
    return {
      message,
    }
  }
}

import { Injectable } from '@nestjs/common'
@Injectable()
export class AppService {
  getHello(): string {
    return '欢迎回来 NestJs!'
  }
}

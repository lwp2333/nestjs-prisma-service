import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { join } from 'path'
import { TranformInterceptor } from './common/tranform.interceptor'
import { HttpExecptionFilter } from './common/http-execption.filter'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  // 统一返回拦截器
  app.useGlobalInterceptors(new TranformInterceptor())
  // 统一错误过滤返回
  app.useGlobalFilters(new HttpExecptionFilter())
  // 跨域适配
  app.enableCors()
  // 项目前缀
  app.setGlobalPrefix('v1')
  // 校验管道
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
    })
  )
  // 静态资源
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/static',
    maxAge: 1000 * 60 * 10,
  })
  // 视图模板引擎
  app.setBaseViewsDir(join(__dirname, '..', 'views')) // 放视图的文件
  app.setViewEngine('ejs')
  // swagger docs
  const config = new DocumentBuilder().setTitle('swagger').setDescription('The api docs description').setVersion('1.0').build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
  // 启动微服务
  await app.startAllMicroservices()
  // 启动主服务
  await app.listen(3000)

  console.log(`服务已启动: ${await app.getUrl()}`)
}
bootstrap()

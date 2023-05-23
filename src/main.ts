import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WsAdapter } from '@nestjs/platform-ws';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import path from 'path';

import { HttpExecptionFilter } from '@/common/httpExecption.filter';
import { TranformInterceptor } from '@/common/tranform.interceptor';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // ws
  app.useWebSocketAdapter(new WsAdapter(app));
  // 统一返回拦截器
  app.useGlobalInterceptors(new TranformInterceptor());
  // 统一错误过滤返回
  app.useGlobalFilters(new HttpExecptionFilter());
  // 跨域适配
  app.enableCors();
  // 项目前缀
  // app.setGlobalPrefix('v1');
  // 校验管道
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
    })
  );
  // 视图模板引擎
  app.setBaseViewsDir(path.join(__dirname, '../view')); // 视图文件
  app.setViewEngine('ejs');
  // 静态资源
  app.useStaticAssets(path.join(__dirname, '../public'), {
    prefix: '/public',
    maxAge: 1000 * 60 * 10,
  });
  // swagger docs
  const config = new DocumentBuilder()
    .setTitle('快乐星球')
    .setDescription('happy-planet-service')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  // 启动主服务
  await app.listen(process.env.PORT);
  console.log(`服务已启动: ${await app.getUrl()}`);
}
bootstrap();

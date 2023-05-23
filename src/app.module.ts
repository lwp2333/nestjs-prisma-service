import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MediaModule } from './media/media.module';
import { PuppeteerModule } from './puppeteer/puppeteer.module';
import { PrismaService } from './services/prisma.service';
import { TraslateModule } from './traslate/traslate.module';
import { UploadModule } from './upload/upload.module';

import { WsModule } from './ws/ws.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env.development', '.env.test', '.env'],
    }),
    PuppeteerModule,
    UploadModule,
    TraslateModule,
    MediaModule,
    WsModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService, PrismaService],
})
export class AppModule {}

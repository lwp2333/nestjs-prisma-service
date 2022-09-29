import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService } from './services/prisma.service';
import { PuppeteerModule } from './puppeteer/puppeteer.module';
import { UploadModule } from './upload/upload.module';
import { TraslateModule } from './traslate/traslate.module';
import { MediaModule } from './media/media.module';

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
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService, PrismaService],
})
export class AppModule {}

import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaService } from './prisma.service'

import { PostModule } from './post/post.module'
import { UserModule } from './user/user.module'
import { MediaModule } from './media/media.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.devlopment.local', '.env.development', '.env.production'],
    }),
    // mysql prisma 使用示例
    PostModule,
    UserModule,
    // ffmpeg
    MediaModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService, PrismaService],
})
export class AppModule {}

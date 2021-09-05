import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaService } from './prisma.service'

import { PostModule } from './post/post.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.', '.env.development', '.env.staging', '.env.production'],
    }),
    // mysql prisma 使用示例
    PostModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService, PrismaService],
})
export class AppModule {}

import { Module } from '@nestjs/common'
import { GapiController } from './gapi.controller'
import { PrismaService } from '../prisma.service'

@Module({
  controllers: [GapiController],
  providers: [PrismaService],
})
export class GapiModule {}

import { Controller, Get, Post, Patch, Param, Delete, Body, Query } from '@nestjs/common'
import { ApiTags, ApiResponse } from '@nestjs/swagger'
import { PrismaService } from '@/prisma.service'
import { commmonType } from '@/common/commonResponseType'
import { GetGapiPageListDto } from './dto/gapi.dto'
import { GapiEntity } from './entities/gapi.entity'

@ApiTags('gapi')
@Controller('gapi')
export class GapiController {
  constructor(private readonly prismaService: PrismaService) {}
  /**
   * 不带参数，默认get，
   */
  @Get()
  @ApiResponse({ status: 200, type: [GapiEntity], description: '' })
  async getAllList(): Promise<commmonType<null>> {
    return {
      data: null,
      message: '',
    }
  }

  /**
   * 分页筛选表格
   */
  @Post('listByPage')
  @ApiResponse({ status: 200, type: [GapiEntity], description: '' })
  async getPageList(@Body() body: GetGapiPageListDto): Promise<commmonType<null>> {
    console.log(body)
    return {
      data: null,
      message: '',
    }
  }
}

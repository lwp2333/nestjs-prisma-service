import { Controller, Get, Post, Patch, Param, Delete, Body, Query } from '@nestjs/common'
import { ApiTags, ApiResponse } from '@nestjs/swagger'
import { PrismaService } from '@/prisma.service'
import { commmonType } from '@/common/commonResponseType'
import { EditGapiDetailDto, GetGapiPageListDto } from './dto/gapi.dto'
import { GapiEntity } from './entities/gapi.entity'

@ApiTags('gapiTest')
@Controller('gapiTest')
export class GapiController {
  constructor(private readonly prismaService: PrismaService) {}
  /**
   * 全部列表
   */
  @Get('list')
  @ApiResponse({ status: 200, type: [GapiEntity], description: '' })
  async getAllList(): Promise<commmonType<null>> {
    return {
      data: null,
      message: '',
    }
  }

  /**
   * 分页筛选列表
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

  /**
   * 获取详情 Param
   */
  @Get('getDetail/:id')
  @ApiResponse({ status: 200, type: GapiEntity, description: '' })
  async getDetailByParam(@Param('id') id: string): Promise<commmonType<string>> {
    console.log(id)
    return {
      data: id,
      message: '',
    }
  }

  /**
   * 获取详情 Query
   */
  @Get('getDetail')
  @ApiResponse({ status: 200, type: GapiEntity, description: '' })
  async getDetailByQuery(@Query('id') id: string): Promise<commmonType<string>> {
    console.log(id)
    return {
      data: id,
      message: '',
    }
  }

  /**
   * 编辑详情 Post
   */
  @Post('editDetailByPost')
  @ApiResponse({ status: 200, type: Boolean, description: '' })
  async editDetailByPost(@Body() body: EditGapiDetailDto): Promise<commmonType<null>> {
    console.log(body)
    return {
      data: null,
      message: '',
    }
  }

  /**
   * 编辑详情 Patch
   */
  @Patch('editDetailByPatch')
  @ApiResponse({ status: 200, type: Boolean, description: '' })
  async editDetailByPatch(@Body() body: EditGapiDetailDto): Promise<commmonType<null>> {
    console.log(body)
    return {
      data: null,
      message: '',
    }
  }
}

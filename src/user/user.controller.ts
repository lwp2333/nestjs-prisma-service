import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger'
import { user as UserModel } from '@prisma/client'
import { PrismaService } from '@/prisma.service'
import { commmonType } from '@/common/commonResponseType'
import { CreateUserDto, UpdateUserDto } from './dto/user.dto'
import { UserEntity } from './entities/user.entity'

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  @ApiOperation({ summary: '获取所有用户' })
  @ApiResponse({ status: 200, type: [UserEntity], description: '' })
  async findAll(): Promise<commmonType<UserModel[]>> {
    const data = await this.prismaService.user.findMany({})
    return {
      data,
      message: '成功！',
    }
  }

  @Post()
  @ApiOperation({ summary: '添加用户' })
  @ApiResponse({ status: 200, type: UserEntity, description: '' })
  async create(@Body() body: CreateUserDto): Promise<commmonType<UserModel>> {
    const data = await this.prismaService.user.create({
      data: {
        ...body,
      },
    })
    return {
      data,
      message: '成功！',
    }
  }

  @Get(':id')
  @ApiOperation({ summary: '根据id查找用户' })
  @ApiResponse({ status: 200, type: UserEntity, description: '' })
  async findOne(@Param('id') id: string): Promise<commmonType<UserModel>> {
    const data = await this.prismaService.user.findFirst({
      where: { id: +id },
    })
    return {
      data,
      message: '成功！',
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: '根据id更新用户' })
  @ApiResponse({ status: 200, type: UserEntity, description: '' })
  async update(@Param('id') id: string, @Body() body: UpdateUserDto): Promise<commmonType<UserModel>> {
    const data = await this.prismaService.user.update({
      where: { id: +id },
      data: {
        ...body,
      },
    })
    return {
      data,
      message: '成功！',
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: '根据id删除用户' })
  @ApiResponse({ status: 200, type: UserEntity, description: '' })
  async remove(@Param('id') id: string): Promise<commmonType<UserModel>> {
    const data = await this.prismaService.user.delete({
      where: { id: +id },
    })
    return {
      data,
      message: '成功！',
    }
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common'
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger'
import { post as PostModel } from '@prisma/client'
import { PrismaService } from '../prisma.service'
import { CreatePostDto, UpdatePostDto } from './dto/post.dto'
import { commmonType } from '../common/commonResponseType'
import { PostEntity } from './entities/post.entity'

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get(':authorId')
  @ApiOperation({ summary: '根据作者id，获取全部文章' })
  @ApiResponse({ status: 200, type: [PostEntity], description: '' })
  async findAll(@Param('authorId') authorId: string): Promise<commmonType<PostModel[]>> {
    const data = await this.prismaService.post.findMany({
      where: {
        authorId: +authorId,
      },
    })

    return {
      data,
      message: '成功！',
    }
  }

  @Post(':authorId')
  @ApiOperation({ summary: '根据作者id，发布文章' })
  @ApiResponse({ status: 200, type: PostEntity, description: '' })
  async create(@Param('authorId') authorId: string, @Body() body: CreatePostDto): Promise<commmonType<PostModel>> {
    const data = await this.prismaService.post.create({
      data: {
        ...body,
        authorId: +authorId,
      },
    })
    return {
      data,
      message: '成功！',
    }
  }

  @Get(':authorId/:id')
  @ApiOperation({ summary: '根据作者id及文章id，获取文章' })
  @ApiResponse({ status: 200, type: PostEntity, description: '' })
  async findOne(@Param('id') id: string, @Param('authorId') authorId: string): Promise<commmonType<PostModel>> {
    const data = await this.prismaService.post.findFirst({
      where: {
        id: +id,
        authorId: +authorId,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })
    return {
      data,
      message: '成功！',
    }
  }

  @Patch(':authorId/:id')
  @ApiOperation({ summary: '根据作者id及文章id，更新文章' })
  @ApiResponse({ status: 200, type: PostEntity, description: '' })
  async update(@Param('id') id: string, @Param('authorId') authorId: string, @Body() body: UpdatePostDto): Promise<commmonType<PostModel>> {
    const data = await this.prismaService.post.update({
      data: {
        ...body,
      },
      where: {
        id: +id,
      },
    })
    return {
      data,
      message: '成功！',
    }
  }

  @Delete(':authorId/:id')
  @ApiOperation({ summary: '根据作者id及文章id，删除文章' })
  @ApiResponse({ status: 200, type: PostEntity, description: '' })
  async remove(@Param('id') id: string, @Param('authorId') authorId: string): Promise<commmonType<PostModel>> {
    const data = await this.prismaService.post.findUnique({
      where: {
        id: +id,
      },
    })
    if (data.authorId === +authorId) {
      // 是作者
      await this.prismaService.post.delete({
        where: {
          id: +id,
        },
      })
    } else {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: '不是作者无权限删除！',
        },
        HttpStatus.UNAUTHORIZED
      )
    }

    return {
      data,
      message: '成功！',
    }
  }
}

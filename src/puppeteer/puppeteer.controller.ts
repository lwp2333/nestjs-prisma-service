import { Controller, Post, Body, Req } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateScreenshotDto, CreatePdfDto } from './dto/puppeteer.dto';
import { PuppeteerService } from './puppeteer.service';
import { FileManagerService } from '@/file-manager/file-manager.service';
import { UploadEntity } from '@/upload/entities/upload.entity';
import { ResType } from '@/typings/response.type';

@ApiTags('puppeteer')
@Controller('puppeteer')
export class PuppeteerController {
  constructor(
    private readonly puppeteerService: PuppeteerService,
    private readonly fileManagerService: FileManagerService
  ) {}

  /**
   * 生成页面快照
   */
  @Post('createScreenshot')
  @ApiOkResponse({ status: 200, type: String, description: '页面生成快照' })
  async createScreenshot(@Body() screenshotDto: CreateScreenshotDto): Promise<ResType<UploadEntity>> {
    const { filePath, fileName } = await this.puppeteerService.createScreenshot(screenshotDto);

    return await this.fileManagerService.uploadFileByOss(filePath, fileName);
  }

  /**
   * 生成页面pdf
   */
  @Post('createPdf')
  @ApiOkResponse({ status: 200, type: String, description: '页面生成pdf' })
  async createPdf(@Body() pdfDto: CreatePdfDto): Promise<ResType<UploadEntity>> {
    const { filePath, fileName } = await this.puppeteerService.createPdf(pdfDto);

    return await this.fileManagerService.uploadFileByOss(filePath, fileName);
  }
}

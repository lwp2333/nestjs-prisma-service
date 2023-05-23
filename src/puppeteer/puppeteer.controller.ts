import { FileManagerService } from '@/file-manager/file-manager.service';
import { ResType } from '@/typings/response.type';
import { UploadEntity } from '@/upload/entities/upload.entity';
import { Body, Controller, HostParam, Ip, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreatePdfDto, CreateScreenshotDto } from './dto/puppeteer.dto';
import { PuppeteerService } from './puppeteer.service';

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
  @ApiOkResponse({ status: 200, type: UploadEntity, description: '页面生成快照' })
  async createScreenshot(@Body() screenshotDto: CreateScreenshotDto): Promise<ResType<UploadEntity>> {
    const { filePath, fileName } = await this.puppeteerService.createScreenshot(screenshotDto);

    if (process.env.NODE_ENV === 'production') {
      return await this.fileManagerService.uploadFileByOss(filePath, fileName);
    } else {
      return {
        url: filePath,
        name: fileName,
        size: 0,
      };
    }
  }

  /**
   * 生成页面pdf
   */
  @Post('createPdf')
  @ApiOkResponse({ status: 200, type: UploadEntity, description: '页面生成pdf' })
  async createPdf(@Body() pdfDto: CreatePdfDto): Promise<ResType<UploadEntity>> {
    const { filePath, fileName } = await this.puppeteerService.createPdf(pdfDto);

    if (process.env.NODE_ENV === 'production') {
      return await this.fileManagerService.uploadFileByOss(filePath, fileName);
    } else {
      return {
        url: filePath,
        name: fileName,
        size: 0,
      };
    }
  }
}

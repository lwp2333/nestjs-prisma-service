import { Body, Controller, ParseFilePipe, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUploadDto } from './dto/upload.dto';
import { UploadEntity } from './entities/upload.entity';
import { UploadService } from './upload.service';
import { FileManagerService } from '@/file-manager/file-manager.service';

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService, private readonly fileManagerService: FileManagerService) {}

  /**
   * 上传文件（支持多个）
   */
  @Post('uploadFile')
  @ApiResponse({ status: 200, type: [UploadEntity], description: '文件地址' })
  @UseInterceptors(FileFieldsInterceptor([{ name: 'files', maxCount: 6 }]))
  @ApiConsumes('multipart/form-data')
  async uploadFile(
    @UploadedFiles(new ParseFilePipe({ validators: [] }))
    uploadBody: { files: Express.Multer.File[] },
    @Body() body: CreateUploadDto
  ): Promise<UploadEntity[]> {
    console.log(body);
    return await Promise.all(uploadBody.files.map(it => this.fileManagerService.uploadFileByOss(it, it.originalname)));
  }
}

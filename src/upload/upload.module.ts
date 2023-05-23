import { Module } from '@nestjs/common';
import { FileManagerService } from '../file-manager/file-manager.service';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  controllers: [UploadController],
  providers: [UploadService, FileManagerService],
})
export class UploadModule {}

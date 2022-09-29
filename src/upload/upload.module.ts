import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { FileManagerService } from '../file-manager/file-manager.service';

@Module({
  controllers: [UploadController],
  providers: [UploadService, FileManagerService],
})
export class UploadModule {}

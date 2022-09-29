import { FileManagerService } from '@/file-manager/file-manager.service';
import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';

@Module({
  controllers: [MediaController],
  providers: [MediaService, FileManagerService],
})
export class MediaModule {}

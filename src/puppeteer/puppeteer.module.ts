import { Module } from '@nestjs/common';
import { PuppeteerService } from './puppeteer.service';
import { PuppeteerController } from './puppeteer.controller';
import { FileManagerService } from '@/file-manager/file-manager.service';

@Module({
  controllers: [PuppeteerController],
  providers: [PuppeteerService, FileManagerService],
})
export class PuppeteerModule {}

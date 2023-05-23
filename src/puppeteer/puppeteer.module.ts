import { FileManagerService } from '@/file-manager/file-manager.service';
import { Module } from '@nestjs/common';
import { PuppeteerController } from './puppeteer.controller';
import { PuppeteerService } from './puppeteer.service';

@Module({
  controllers: [PuppeteerController],
  providers: [PuppeteerService, FileManagerService],
})
export class PuppeteerModule {}

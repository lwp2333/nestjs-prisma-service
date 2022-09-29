import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { nanoid } from 'nanoid';
import { FileManagerService } from '@/file-manager/file-manager.service';
import { CreatePdfDto, CreateScreenshotDto, PdfFormatEnum } from './dto/puppeteer.dto';

@Injectable()
export class PuppeteerService {
  constructor(private readonly fileManagerService: FileManagerService) {}
  async createScreenshot(options: CreateScreenshotDto) {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    const { url, width = 1920, height = 1080, deviceScaleFactor = 1, isLandscape = false, isMobile = false } = options;
    await page.setViewport({
      width,
      height,
      deviceScaleFactor,
      isMobile,
      isLandscape,
    });
    const fileName = `${nanoid(12)}.png`;
    const filePath = await this.fileManagerService.getNewFilePath(`${nanoid(12)}.png`);
    try {
      await page.goto(url, {
        waitUntil: 'networkidle2',
      });
      await page.screenshot({ path: filePath, type: 'png' });
    } catch (error) {
      throw error;
    } finally {
      await browser.close();
    }
    return {
      filePath,
      fileName,
    };
  }

  async createPdf(options: CreatePdfDto) {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    const { url, format = PdfFormatEnum.A4, printBackground = true, scale = 1, landscape = false } = options;
    const fileName = `${nanoid(12)}.pdf`;
    const filePath = await this.fileManagerService.getNewFilePath(fileName);
    try {
      await page.goto(url, {
        waitUntil: 'networkidle0',
      });
      await page.pdf({
        path: filePath,
        format,
        printBackground,
        landscape,
        scale,
      });
    } catch (error) {
      throw error;
    } finally {
      await browser.close();
    }
    return {
      filePath,
      fileName,
    };
  }
}

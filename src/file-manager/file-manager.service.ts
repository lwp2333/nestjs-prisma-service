import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Oss from 'ali-oss';
import dayjs from 'dayjs';
import _fs from 'fs';
import fs from 'fs/promises';
import { OssConfig } from '@/typings/ossConfig.type';
import { UploadEntity } from '@/upload/entities/upload.entity';

@Injectable()
export class FileManagerService {
  ossConfig: OssConfig;
  constructor(private readonly configServices: ConfigService) {
    this.ossConfig = JSON.parse(this.configServices.get('OSS_CONFIG'));
  }

  async getNewFilePath(file: string | Express.Multer.File) {
    const day = dayjs().format('YYYYMMDD');
    const fileDir = `public/${day}`;
    const fileName = typeof file === 'string' ? file : file.originalname;
    if (!_fs.existsSync(fileDir)) {
      await fs.mkdir(fileDir, { recursive: true });
    }
    return `${fileDir}/${fileName}`;
  }

  async uploadFileBylocal(file: Express.Multer.File): Promise<UploadEntity> {
    const filePath = await this.getNewFilePath(file);
    await fs.writeFile(filePath, file.buffer);
    return {
      name: file.originalname,
      url: filePath,
      size: file.size,
    };
  }
  async uploadFileByOss(file: Express.Multer.File | string, customFileKey: string) {
    const { accessKeyId, accessKeySecret, region, bucket } = this.ossConfig;
    const client = new Oss({
      accessKeyId,
      accessKeySecret,
      region,
      bucket,
    });
    const day = dayjs().format('YYYYMMDD');
    const fileKey = `media/${day}/${customFileKey}`;
    const {
      url,
      name,
      res: { size },
    } = await client.put(fileKey, typeof file === 'string' ? file : file.buffer).then(res => {
      console.log(res);
      return res;
    });
    return {
      name,
      url,
      size,
    };
  }
}

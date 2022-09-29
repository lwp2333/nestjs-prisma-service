import { FileManagerService } from '@/file-manager/file-manager.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Converter } from 'ffmpeg-stream'; // NOTE: ffmpeg 依赖于环境的 ffmpeg
import fs from 'fs';
import path from 'path';
import progressStream from 'progress-stream';
@Injectable()
export class MediaService {
  constructor(private readonly fileManagerService: FileManagerService) {}

  async convert(originUrl: string) {
    const converter = new Converter();
    const dirPath = path.resolve(process.cwd(), 'temp');
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }

    const [fileName] = originUrl.split('/').reverse();
    const outPutFileName = fileName.replace('aac', 'mp3');
    const stream = fs.createWriteStream(path.join(dirPath, fileName), {
      flags: 'w',
    });

    await new Promise(async resolve => {
      console.log(`正在下载音频文件：${originUrl}`);
      const fetch = await import('node-fetch').then(res => res.default);
      fetch(originUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'application/octet-stream' },
      }).then(res => {
        //获取请求头中的文件大小数据
        const fsize = res.headers.get('content-length');
        //创建进度
        const str = progressStream({
          length: Number(fsize),
          time: 100 /* ms */,
        });
        str.on('progress', function (progressData) {
          const percentage = Math.round(progressData.percentage) + '%';
          // 输出下载进度
          console.log(percentage);
        });
        res.body
          .pipe(str)
          .pipe(stream)
          .on('close', () => {
            console.log(`音频文件下载完毕：${originUrl}`);
            resolve('success');
          });
      });
    });

    converter.createInputFromFile(path.join(dirPath, fileName), {
      acodec: 'aac',
    });
    converter.createOutputToFile(path.join(dirPath, outPutFileName), {
      acodec: 'libmp3lame',
      vf: 'ac=2,ab=160',
    });

    // 开始转码
    console.log('开始转码');
    await converter.run().finally(() => {
      console.log(`音频文件转码完成：${originUrl}`);
    });

    // 开始上传oss
    try {
      const url = await this.fileManagerService.uploadFileByOss(path.join(dirPath, outPutFileName), outPutFileName);
      console.log(`转码完成。源文件地址：${originUrl}，最终 URL:${url}`);
      return url;
    } catch (error) {
      throw new HttpException('oss上传失败', HttpStatus.BAD_REQUEST);
    } finally {
      fs.unlinkSync(path.join(dirPath, fileName));
      fs.unlinkSync(path.join(dirPath, outPutFileName));
      console.log('删除temp 缓存文件');
    }
  }
}

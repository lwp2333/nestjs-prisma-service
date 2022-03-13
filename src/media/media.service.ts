import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import request from 'request'
import { Converter } from 'ffmpeg-stream' // NOTE: ffmpeg 依赖于环境的 ffmpeg
import fs from 'fs'
import path from 'path'
import OSS from 'ali-oss'
import { OssConfig } from './interface/oss'

@Injectable()
export class MediaService {
  ossConfig: OssConfig

  constructor(private readonly configService: ConfigService) {
    this.ossConfig = JSON.parse(this.configService.get<string>('OSS_CONFIG'))
  }

  async convert(originUrl: string) {
    const converter = new Converter()
    const dirPath = path.resolve(process.cwd(), 'temp')
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath)
    }

    const [fileName] = originUrl.split('/').reverse()
    const outPutFileName = fileName.replace('aac', 'mp3')
    const stream = fs.createWriteStream(path.join(dirPath, fileName), {
      flags: 'w',
    })

    await new Promise(resolve => {
      console.log(`正在下载音频文件：${originUrl}`)

      request(originUrl)
        .pipe(stream)
        .on('close', () => {
          console.log(`音频文件下载完毕：${originUrl}`)
          resolve('success')
        })
    })

    converter.createInputFromFile(path.join(dirPath, fileName), {
      acodec: 'aac',
    })
    converter.createOutputToFile(path.join(dirPath, outPutFileName), {
      acodec: 'libmp3lame',
      vf: 'ac=2,ab=160',
    })

    // start processing
    await converter.run().finally(() => {
      console.log(`音频文件转码完成：${originUrl}`)
    })

    // start upload
    try {
      const url = await this.ossUploadFile(path.join(dirPath, outPutFileName), outPutFileName)
      console.log(`转码完成。源文件地址：${originUrl}，最终 URL：${url}`)
      return url
    } catch (error) {
      throw new HttpException('oss 上传失败', HttpStatus.BAD_REQUEST)
    } finally {
      fs.unlinkSync(path.join(dirPath, fileName))
      fs.unlinkSync(path.join(dirPath, outPutFileName))
    }
  }

  async ossUploadFile(recordPath: string, fileKey: string): Promise<string> {
    console.log(this.ossConfig)

    const { accessKeyId, accessKeySecret, region, bucket, cdnHostname } = this.ossConfig
    const client = new OSS({
      accessKeyId,
      accessKeySecret,
      region,
      bucket,
    })
    const res = await client.put(`media/audio/${fileKey}`, recordPath)
    console.log(`${fileKey}、已成功上传至 OSS`)
    const formatUrl = `http://${cdnHostname}/${res.name}`
    return formatUrl
  }
}

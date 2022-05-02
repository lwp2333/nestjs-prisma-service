import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { MediaService } from './media.service'
import { ResType } from '@/common/response.type'
import { TranscodeAudioDto } from './dto/media.dto'
import { TranscodeAudioEntity } from './entities/media.entity'

@ApiTags('media')
@Controller('media')
export class MediaController {
  constructor(private mediaService: MediaService) {}

  /**
   * aac文件转mp3
   */
  @Post('audio/transcode')
  @ApiOperation({ summary: '音频转码' })
  @ApiOkResponse({
    status: 200,
    type: TranscodeAudioEntity,
    description: '转码mp3后的url',
  })
  async transcodeAudio(@Body() body: TranscodeAudioDto): Promise<ResType<TranscodeAudioEntity>> {
    const resultUrl = await this.mediaService.convert(body.originAudioSrc)

    return {
      data: {
        resultUrl,
      },
      message: '成功',
    }
  }
}

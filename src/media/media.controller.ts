import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MediaService } from './media.service';
import { ResType } from '@/typings/response.type';
import { TranscodeAudioDto } from './dto/media.dto';
import { UploadEntity } from '@/upload/entities/upload.entity';

@ApiTags('media')
@Controller('media')
export class MediaController {
  constructor(private mediaService: MediaService) {}

  /**
   * aac文件转mp3
   */
  @Post('/audioTranscode')
  @ApiOperation({ summary: 'acc音频转码mp3' })
  @ApiOkResponse({
    status: 200,
    type: String,
    description: '转码后的url',
  })
  async transcodeAudio(@Body() body: TranscodeAudioDto): Promise<ResType<UploadEntity>> {
    return await this.mediaService.convert(body.originAudioSrc);
  }
}

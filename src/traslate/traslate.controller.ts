import { ResType } from '@/typings/response.type';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetTraslateDto, TraslatePlatformEnum } from './dto/traslate.dto';
import { TraslateService } from './traslate.service';

@ApiTags('langPlatform')
@Controller('traslate')
export class TraslateController {
  constructor(private readonly traslateService: TraslateService) {}

  /**
   * 获取文本翻译（有道、百度）
   */
  @Post('getTraslate')
  @ApiResponse({
    status: 200,
    type: [String],
    description: '翻译结果',
  })
  async traslate(@Body() body: GetTraslateDto): Promise<ResType<string[]>> {
    const { q, from = 'auto', to, type = TraslatePlatformEnum.baidu } = body;

    if (type === TraslatePlatformEnum.baidu) {
      return this.traslateService.getBaiduTranslate(q, to, from);
    }
    return this.traslateService.getYoudaoTranslate(q, to, from);
  }
}

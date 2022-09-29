import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export enum TraslatePlatformEnum {
  baidu,
  youdao,
}

export class GetTraslateDto {
  /**
   * 待翻译文本
   */
  q: string;
  /**
   * 源语言类型
   */
  @IsOptional()
  from?: string;
  /**
   * 输出语言类型
   */
  to: string;
  /**
   * 翻译平台
   */
  @IsOptional()
  @IsEnum(TraslatePlatformEnum)
  @ApiProperty({ enum: TraslatePlatformEnum, enumName: 'TraslatePlatform' })
  type?: TraslatePlatformEnum;
}

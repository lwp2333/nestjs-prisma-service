import { IsUrl } from 'class-validator'

export class TranscodeAudioDto {
  /**
   * 原始音频地址
   */
  @IsUrl()
  originAudioSrc: string
}

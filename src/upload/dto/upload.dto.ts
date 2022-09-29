import { ApiProperty } from '@nestjs/swagger';

export class CreateUploadDto {
  /**
   * 唯一标识
   */
  id: string;
  /**
   * 文件数组
   */
  @ApiProperty({ type: [String], format: 'binary' })
  files: File[];
}

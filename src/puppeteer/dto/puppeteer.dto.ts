import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsUrl, Max, Min } from 'class-validator';

export class CreateScreenshotDto {
  /**
   * 页面地址
   */
  @IsUrl()
  url: string;
  /**
   * 宽
   * `默认` 1920
   */
  @IsOptional()
  @IsNumber()
  width?: number;
  /**
   * 高
   * `默认` 1080
   */
  @IsOptional()
  @IsNumber()
  height?: number;
  /**
   * 是否
   * `默认` true
   */
  @IsOptional()
  @IsBoolean()
  fullPage?: boolean;
  /**
   * dpr
   * `默认` 1
   */
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(3)
  deviceScaleFactor?: number;
  /**
   * 是否横向
   * `默认` false
   */
  @IsOptional()
  @IsBoolean()
  isLandscape?: boolean;
  /**
   * 是否移动端页面
   * `默认` false
   */
  @IsOptional()
  @IsBoolean()
  isMobile?: boolean;
}
export enum PdfFormatEnum {
  Letter = 'Letter',
  Legal = 'Legal',
  Tabloid = 'Tabloid',
  Ledger = 'Ledger',
  A0 = 'A0',
  A1 = 'A1',
  A2 = 'A2',
  A3 = 'A3',
  A4 = 'A4',
  A5 = 'A5',
  A6 = 'A6',
}

export class CreatePdfDto {
  /**
   * 页面地址
   */
  @IsUrl()
  url: string;
  /**
   * -Letter: 8.5in x 11in
   * -Legal: 8.5in x 14in
   * -Tabloid: 11in x 17in
   * -Ledger: 17in x 11in
   * -A0: 33.1in x 46.8in
   * -A1: 23.4in x 33.1in
   * -A2: 16.54in x 23.4in
   * -A3: 11.7in x 16.54in
   * -A4: 8.27in x 11.7in
   * -A5: 5.83in x 8.27in
   * -A6: 4.13in x 5.83in
   * `默认 A4`
   */
  @IsOptional()
  @IsEnum(PdfFormatEnum)
  @ApiProperty({ enum: PdfFormatEnum, enumName: 'PdfFormatEnum' })
  format?: PdfFormatEnum;
  /**
   * 缩放
   * `默认` 1
   */
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(2)
  scale?: number;
  /**
   * 是否横向
   * `默认` false
   */
  @IsOptional()
  @IsBoolean()
  landscape?: boolean;
  /**
   * 是否包含背景
   * `默认` true
   */
  @IsOptional()
  @IsBoolean()
  printBackground?: boolean;
}

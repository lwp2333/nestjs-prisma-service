import { IsNumber, MaxLength, MinLength, Min, Max } from 'class-validator'

enum EStatus {
  finished,
  unFinished,
}

export class GetGapiPageListDto {
  /**
   *  关键词
   */
  @MinLength(6)
  @MaxLength(12)
  keyword?: string
  /**
   *  页码
   */
  @IsNumber()
  @Min(1)
  pageIndex: number
  /**
   *  分页
   */
  @IsNumber()
  @Max(100)
  pageSize: number
  /**
   * 枚举状态
   */
  statusEnum: EStatus
}

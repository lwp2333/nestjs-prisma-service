import { IsNotEmpty, IsBoolean } from 'class-validator'

export class CreatePostDto {
  /**
   *  标题
   */
  @IsNotEmpty()
  title: string
  /**
   *  内容
   */
  @IsNotEmpty()
  content: string
  /**
   *  是否发布
   */
  @IsBoolean()
  published?: boolean
}

export class UpdatePostDto {
  /**
   *  标题
   */
  @IsNotEmpty()
  title: string
  /**
   *  内容
   */
  @IsNotEmpty()
  content: string
  /**
   *  是否发布
   */
  @IsBoolean()
  published?: boolean
}

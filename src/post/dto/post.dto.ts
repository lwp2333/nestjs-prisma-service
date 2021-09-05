import { IsNotEmpty, IsBoolean } from 'class-validator'

export class CreatePostDto {
  @IsNotEmpty()
  title: string
  @IsNotEmpty()
  content: string
  @IsBoolean()
  published?: boolean
}

export class UpdatePostDto {
  @IsNotEmpty()
  title: string
  @IsNotEmpty()
  content: string
  @IsBoolean()
  published?: boolean
}

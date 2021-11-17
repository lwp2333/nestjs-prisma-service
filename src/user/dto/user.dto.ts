import { IsEmail, MaxLength, MinLength } from 'class-validator'

export class CreateUserDto {
  /**
   *  姓名
   */
  @MinLength(6)
  @MaxLength(12)
  name: string

  /**
   *  邮箱
   */
  @IsEmail({})
  email: string // 邮箱
}

export class UpdateUserDto {
  /**
   *  姓名
   */
  @MinLength(6)
  @MaxLength(12)
  name: string

  /**
   *  邮箱
   */
  @IsEmail({})
  email: string // 邮箱
}

import { IsEmail, MaxLength, MinLength } from 'class-validator'
export class CreateUserDto {
  @MinLength(6)
  @MaxLength(12)
  name: string
  @IsEmail({})
  email: string
}

export class UpdateUserDto {
  @MinLength(6)
  @MaxLength(12)
  name: string
  @IsEmail({})
  email: string
}

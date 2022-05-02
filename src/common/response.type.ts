export type ResType<T> = {
  data: T
  message: string
}
export type ResponseType<T> = {
  statusCode: number
  error: boolean
} & Partial<ResType<T>>

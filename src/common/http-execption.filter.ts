import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'
import { Response } from 'express'

@Catch(HttpException)
export class HttpExecptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = exception.getStatus()
    const message = exception.message
    const excetionResponse: any = exception.getResponse()

    let validatorMessage = excetionResponse.message

    if (typeof validatorMessage === 'object') {
      validatorMessage = excetionResponse.message[0]
    }

    response.status(status).json({
      statusCode: status,
      data: null,
      message: validatorMessage || message,
      error: true,
    })
  }
}

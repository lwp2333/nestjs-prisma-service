import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ResponseType } from './commonResponseType'

@Injectable()
export class TranformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseType<any>> {
    return next.handle().pipe(
      map(res => ({
        statusCode: 200,
        data: res.data || null,
        message: res.message,
        error: false,
      }))
    )
  }
}

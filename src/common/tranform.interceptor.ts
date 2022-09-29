import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { ResType } from '../typings/response.type';

@Injectable()
export class TranformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<ResType>) {
    return next.handle().pipe(
      map(res => ({
        statusCode: res.statusCode || 200,
        data: res.data ?? (res || null),
        message: res.message || '',
        error: res.error || false,
      }))
    );
  }
}

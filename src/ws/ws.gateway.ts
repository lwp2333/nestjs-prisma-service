import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Socket } from 'net';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'ws';

@WebSocketGateway(8080, { transports: ['websocket'] })
export class WsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('exchange')
  onExchange(@ConnectedSocket() client: Socket, @MessageBody() data: string): Observable<WsResponse<number>> {
    console.log('>>>接收到消息 :', data);
    return from([1, 2, 3]).pipe(
      map(item => ({
        event: 'exchange',
        data: item,
      }))
    );
  }
}

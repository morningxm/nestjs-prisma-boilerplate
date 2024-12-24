import { Logger, UseGuards } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { WsAuthGuard } from '@/shared/guards';

@WebSocketGateway()
export class WebsocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(WebsocketGateway.name);

  private clients: Set<Socket> = new Set();

  @WebSocketServer() io: Server;

  afterInit() {
    this.logger.log(`${WebsocketGateway.name}: Initialized`);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleConnection(client: Socket, ..._args: any[]) {
    this.clients.add(client);

    this.logger.log(
      `${WebsocketGateway.name}: Connected ${client.id}, count: ${this.clients.size}`,
    );
  }

  handleDisconnect(client: Socket) {
    this.clients.delete(client);

    this.logger.log(
      `${WebsocketGateway.name}: Disconnected ${client.id}, count: ${this.clients.size}`,
    );
  }

  @SubscribeMessage('ping')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handlePing(client: Socket, data: any) {
    this.logger.log(
      `${WebsocketGateway.name}: ping from client id: ${client.id}, Payload: ${data}`,
    );
    return {
      event: 'pong',
      data,
    };
  }

  @SubscribeMessage('chat')
  @UseGuards(WsAuthGuard)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleMessage(client: Socket, data: any) {
    this.logger.log(
      `${WebsocketGateway.name}: chat from client id: ${client.id}, Payload: ${data}`,
    );
    return {
      event: 'chat',
      data,
    };
  }
}

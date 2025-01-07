import { Module } from '@nestjs/common';

import { CoreModule } from '@/core/core.module';
import { AuthModule } from '@/features/auth/auth.module';
import { SocketAuthMiddleware } from '@/shared/middlewares';

import { WebsocketGateway } from './websocket.gateway';

@Module({
  imports: [CoreModule, AuthModule],
  providers: [WebsocketGateway, SocketAuthMiddleware],
})
export class WebsocketGatewayModule {}

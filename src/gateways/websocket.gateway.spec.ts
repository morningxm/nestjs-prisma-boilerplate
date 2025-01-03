import { INestApplication, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Socket, io } from 'socket.io-client';

import { WebsocketGateway } from './websocket.gateway';

async function createNestApp(...gateways: Provider[]): Promise<INestApplication> {
  const testingModule = await Test.createTestingModule({
    providers: gateways,
  }).compile();
  return testingModule.createNestApplication();
}

describe('WebsocketGateway', () => {
  let gateway: WebsocketGateway;
  let app: INestApplication;
  let ioClient: Socket;

  beforeAll(async () => {
    // Instantiate the app
    app = await createNestApp(WebsocketGateway);
    // Get the gateway instance from the app instance
    gateway = app.get<WebsocketGateway>(WebsocketGateway);
    // Create a new client that will interact with the gateway
    ioClient = io('http://localhost:6000', {
      autoConnect: false,
      transports: ['websocket', 'polling'],
    });

    app.listen(6000);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  it('should emit "pong" on "ping"', async () => {
    ioClient.connect();
    ioClient.emit('ping', 'Hello world!');
    await new Promise<void>((resolve) => {
      ioClient.on('pong', (data) => {
        expect(data).toBe('Hello world!');
        resolve();
      });
    });
    ioClient.disconnect();
  });
});

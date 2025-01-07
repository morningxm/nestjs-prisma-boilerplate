import { User } from '@prisma/client';
import { Socket as IOSocket } from 'socket.io';

type SocketId = string;

export class Socket extends IOSocket {
  id: SocketId;
  user?: User;
  roomType?: string;
  roomId?: string;
  room?: string;
}

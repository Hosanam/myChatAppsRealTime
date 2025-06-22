import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { ChatService } from './chat.service';
import { addUser, removeUser, getUser } from './users';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private server: Server;
  private logger = new Logger('ChatGateway');

  constructor(private readonly chatService: ChatService) {}

  afterInit(server: Server) {
    this.server = server;
    this.logger.log('WebSocket gateway initialized');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    const user = removeUser(client.id);
    if (user) {
      this.server.to(user.room).emit('message', {
        user: 'admin',
        text: `${user.name} has left.`,
      });
    }
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join')
  async handleJoin(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { name: string; room: string },
  ) {
    const { name, room } = payload;
    const result = addUser({ id: client.id, name, room });

    if (result.error) {
      client.emit('error', { error: result.error });
      return;
    }

    const user = result.user;

    if (!user) {
      client.emit('error', { error: 'User creation failed' });
      return;
    }

    // ✅ Save user to DB
    await this.chatService.saveUser({
      id: user.id,
      name: user.name,
      room: user.room,
    });

    client.join(room);

    client.emit('message', {
      user: 'admin',
      text: `Welcome to ${room}, ${name}`,
    });

    client.broadcast.to(room).emit('message', {
      user: 'admin',
      text: `${name} has joined.`,
    });

    // ✅ Send chat history
    const history = await this.chatService.getMessagesByRoom(room, 50);
    client.emit('chatHistory', history);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { message: string },
  ) {
    const user = getUser(client.id);

    if (!user) {
      client.emit('error', { error: 'User not found' });
      return;
    }

    // ✅ Save message to DB
    const saved = await this.chatService.saveMessage({
      content: payload.message,
      userId: user.id,
      room: user.room,
    });

    this.server.to(user.room).emit('message', {
      user: user.name,
      text: saved.content,
      createdAt: saved.createdAt,
    });
  }
}

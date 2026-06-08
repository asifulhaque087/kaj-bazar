import { OnModuleInit, Inject } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import type { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, Subscription, Observable } from 'rxjs';
import {
  type CreateMessageRequest,
  MessageResponse,
  ConversationResponse,
  ConversationRequest,
} from '@app/common/generated/chat';

// Explicit structural typing for your generated gRPC clients
interface ChatServiceClient {
  createMessage(data: CreateMessageRequest): Observable<MessageResponse>;
  findOrCreateConversation(
    data: ConversationRequest,
  ): Observable<ConversationResponse>;
  streamMessages(data: { username: string }): Observable<MessageResponse>;
}

@WebSocketGateway({ cors: { origin: '*' }, namespace: 'chat' })
export class ChatGateway
  implements OnModuleInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server!: Server;
  private chatService!: ChatServiceClient;

  // Track open gRPC streaming subscriptions to prevent memory leaks
  private activeStreams = new Map<string, Subscription>();

  constructor(@Inject('CHAT_SERVICE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.chatService = this.client.getService<ChatServiceClient>('ChatService');
  }

  async handleConnection(client: Socket) {
    const username = client.handshake.query.username as string | undefined;
    if (!username) {
      client.disconnect();
      return;
    }

    console.log(
      `User ${username} connected over WS. Initializing gRPC stream...`,
    );

    // Open a persistent gRPC server stream to the Chat Microservice
    const grpcStream: Observable<MessageResponse> =
      this.chatService.streamMessages({ username });

    const subscription = grpcStream.subscribe({
      next: (message: MessageResponse) => {
        // Automatically forward incoming gRPC payload down to the active WS client
        client.emit('messageReceived', message);
      },
      error: (err: unknown) =>
        console.error(`gRPC Stream Error for ${username}:`, err),
      complete: () =>
        console.log(`gRPC Stream for ${username} closed by remote.`),
    });

    this.activeStreams.set(client.id, subscription);
  }

  handleDisconnect(client: Socket) {
    const stream = this.activeStreams.get(client.id);
    if (stream) {
      stream.unsubscribe(); // Clean up gRPC connection cleanly
      this.activeStreams.delete(client.id);
      console.log(
        `Cleaned up gRPC resource allocations for client ID: ${client.id}`,
      );
    }
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, payload: CreateMessageRequest) {
    // Client sends via WS -> Gateway proxies payload via unary gRPC to Chat service
    try {
      const savedMessage: MessageResponse = await firstValueFrom(
        this.chatService.createMessage(payload),
      );

      // Return confirmation back to sender client
      return { status: 'OK', message: savedMessage };
    } catch (error: any) {
      return {
        status: 'ERROR',
        error: error.message || 'An unknown error occurred',
      };
    }
  }
}

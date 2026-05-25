import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ChatService } from './chat.service';
import {
  ChatServiceController,
  ChatServiceControllerMethods,
  ConversationResponse,
  MessageResponse,
} from '@app/common/generated/chat';
import {
  CreateMessageDto,
  FindOrCreateConversationDto,
  StreamMessagesDto,
} from '@app/common';

@Controller()
@ChatServiceControllerMethods()
export class ChatController implements ChatServiceController {
  constructor(private readonly chatService: ChatService) {}

  async createMessage(@Payload() data: CreateMessageDto) {
    return this.chatService.createMessage(data) as unknown as MessageResponse;
  }

  async findOrCreateConversation(@Payload() data: FindOrCreateConversationDto) {
    return this.chatService.findOrCreateConversation(
      data,
    ) as unknown as ConversationResponse;
  }

  streamMessages(
    @Payload() data: StreamMessagesDto,
  ): Observable<MessageResponse> {
    return this.chatService.streamMessages(data.username);
  }
}

import {
  CreateMessageDto,
  DRIZZLE,
  FindOrCreateConversationDto,
  throwGrpcError,
  tryit,
} from '@app/common';
import { MessageResponse } from '@app/common/generated/chat';
import { Inject, Injectable } from '@nestjs/common';
import type { DrizzleDB } from 'apps/chat/drizzle/drizzle';
import { ConversationsTable, MessagesTable } from 'apps/chat/src/schemas';
import { and, or, eq } from 'drizzle-orm';
import { filter, Observable, Subject } from 'rxjs';

@Injectable()
export class ChatService {
  private messageBus$ = new Subject<any>();

  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async createMessage(data: CreateMessageDto) {
    const [message, messageErr] = await tryit(
      this.db
        .insert(MessagesTable)
        .values(data)
        .returning()
        .then((res) => ({
          ...res[0],
          createdAt: res[0].createdAt.toISOString(),
        })),
    );

    if (messageErr) {
      throwGrpcError('INTERNAL', messageErr.message);
    }

    this.messageBus$.next(message);

    return message;
  }

  // gRPC Controller will map back to this observer pattern stream
  streamMessages(username: string): Observable<MessageResponse> {
    return this.messageBus$.asObservable().pipe(
      // Ensure users only receive messages intended specifically for them
      filter((message) => message.receiverUsername === username),
    );
  }
  async findOrCreateConversation(data: FindOrCreateConversationDto) {
    const {
      senderUsername = '',
      receiverUsername = '',
      receiverProfilePhoto,
      senderProfilePhoto,
    } = data;

    // 1. Try to find an existing conversation with messages
    const [conversation, conversationErr] = await tryit(
      this.db.query.ConversationsTable.findFirst({
        where: or(
          and(
            eq(ConversationsTable.senderUsername, senderUsername),
            eq(ConversationsTable.receiverUsername, receiverUsername),
          ),
          and(
            eq(ConversationsTable.senderUsername, receiverUsername),
            eq(ConversationsTable.receiverUsername, senderUsername),
          ),
        ),
        with: {
          messages: true, // Eagerly load messages if conversation exists
        },
      }),
    );

    if (conversationErr) throwGrpcError('INTERNAL', conversationErr.message);
    if (conversation) return conversation;

    // 2. If no conversation found, create a new one
    const [newConversation, newConversationErr] = await tryit(
      this.db
        .insert(ConversationsTable)
        .values({
          receiverUsername: receiverUsername,
          senderUsername: senderUsername,
          senderProfilePhoto: senderProfilePhoto,
          receiverProfilePhoto: receiverProfilePhoto,
        })
        .returning()
        .then((res) => res[0]),
    );

    if (newConversationErr) {
      throwGrpcError('INTERNAL', newConversationErr.message);
    }

    // 3. After successful insertion, fetch the newly created conversation
    //    along with its messages (which will be an empty array initially)
    const [conversationMessages, conversationMessagesErr] = await tryit(
      this.db.query.ConversationsTable.findFirst({
        where: eq(ConversationsTable.id, newConversation.id),
        with: {
          messages: true,
        },
      }),
    );

    if (conversationMessagesErr) {
      throwGrpcError('INTERNAL', conversationMessagesErr.message);
    }

    return conversationMessages;
  }
}

import { MessagesTable } from "@src/drizzle/schemas/message.schema";
import { relations } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";

// --- Conversations Table ---
export const ConversationsTable = pgTable("conversations_table", {
  id: uuid("id").primaryKey().defaultRandom(),
  senderUsername: text("sender_username").notNull(),
  receiverUsername: text("receiver_username").notNull(),
});

// --- Relationships ---
export const conversationsRelations = relations(
  ConversationsTable,
  ({ many }) => ({
    messages: many(MessagesTable), // A conversation can have many messages
  })
);

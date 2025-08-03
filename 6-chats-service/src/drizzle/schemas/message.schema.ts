import { ConversationsTable } from "@src/drizzle/schemas/conversation.schema";
import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  boolean,
  timestamp,
  jsonb,
  uuid,
} from "drizzle-orm/pg-core";
// import { InferSelectModel, InferInsertModel } from 'drizzle-orm';

// Define the type for your offer object for better TypeScript support
interface Offer {
  gigTitle: string;
  gigId: string;
  price: number;
  description: string;
  deliveryInDays: number;
  // ** optional
  oldDeliveryDate?: string;
  newDeliveryDate?: string;
  accepted?: boolean;
  cancelled?: boolean;
}

const defaultOfferValue: Offer = {
  gigTitle: "",
  gigId: "",
  price: 0,
  description: "",
  deliveryInDays: 0,
  oldDeliveryDate: "",
  newDeliveryDate: "",
  accepted: false,
  cancelled: false,
};

export const MessagesTable = pgTable("messages_table", {
  id: uuid("id").primaryKey().defaultRandom(),
  conversationId: uuid("conversation_id")
    .references(() => ConversationsTable.id, { onDelete: "cascade" })
    .notNull(),
  senderUsername: text("sender_username").notNull(),
  receiverUsername: text("receiver_username").notNull(),
  senderPicture: text("sender_picture").notNull(),
  receiverPicture: text("receiver_picture").notNull(),
  buyerId: uuid("buyer_id").notNull(),
  sellerId: uuid("seller_id").notNull(),

  // ** optional
  body: text("body").default(""),
  file: text("file").default(""),
  fileType: text("file_type").default(""),
  fileSize: text("file_size").default(""),
  fileName: text("file_name").default(""),
  // gigId: text("gig_id").default(""),
  isRead: boolean("is_read").default(false),
  hasOffer: boolean("has_offer").default(false),
  offer: jsonb("offer").$type<Offer>().default(defaultOfferValue),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const messagesRelations = relations(MessagesTable, ({ one }) => ({
  conversation: one(ConversationsTable, {
    fields: [MessagesTable.conversationId],
    references: [ConversationsTable.id],
  }), // A message belongs to one conversation
}));

// export type Auth = typeof MessagesTable.$inferSelect;

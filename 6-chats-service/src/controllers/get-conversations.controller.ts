import { handleAsync } from "@fvoid/shared-lib";
import { db } from "@src/drizzle/db";
import { ConversationsTable, MessagesTable } from "@src/drizzle/schemas"; // Import MessagesTable
import { eq, desc } from "drizzle-orm"; // Import desc for ordering
import type { Request, Response } from "express";

const getConversations = async (req: Request, res: Response) => {
  const { id } = req.params;

const result = await db.query.ConversationsTable.findFirst({
  where: eq(ConversationsTable.id, id!),
  with: {
    messages: {
      orderBy: desc(MessagesTable.createdAt),
      limit: 1,
    },
  },
});


  // 1. Define a CTE to find the latest message for relevant conversations
  const latestMessagesCTE = db.$with("latest_messages").as(
    db
      .select()
      .from(MessagesTable)
      .orderBy(MessagesTable.conversationId, desc(MessagesTable.createdAt))
      .distinctOn(MessagesTable.conversationId) // Crucial for getting only the latest per conversation ID
  );

  // 2. Query for the conversation(s) and join with the latest message CTE
  const [conversationWithLastMessage] = await handleAsync(
    db
      .with(latestMessagesCTE) // Use the CTE here
      .select({
        conversation: ConversationsTable, // Select the entire conversation object
        lastMessage: latestMessagesCTE, // Select the entire CTE row as 'lastMessage' (will be null if no messages)
      })
      .from(ConversationsTable)
      .leftJoin(
        latestMessagesCTE,
        eq(ConversationsTable.id, latestMessagesCTE.conversationId)
      )
      .where(eq(ConversationsTable.id, id))
      .limit(1) // Assuming you only expect one unique conversation between two users
  );

  // Check if a conversation was found
  if (!conversationWithLastMessage) {
    // If no conversation found (and thus no last message), return null or an appropriate response
    return res.status(404).json({ message: "Conversation not found." });
  }

  // Return the found conversation with its last message
  return res.json(conversationWithLastMessage);
};

export default getConversations;

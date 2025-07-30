import { handleAsync } from "@fvoid/shared-lib";
import { db } from "@src/drizzle/db";
import { ConversationsTable } from "@src/drizzle/schemas";
import type { FindOrCreateConversationInput } from "@src/validations/conversation.validations";
import { and, eq, or } from "drizzle-orm";
import type { Request, Response } from "express";

const findOrCreateConversation = async (req: Request, res: Response) => {
  const { senderUsername, receiverUsername } =
    req.body as FindOrCreateConversationInput;

  // 1. Try to find an existing conversation with messages
  const existingConversations = await handleAsync(
    db.query.ConversationsTable.findFirst({
      where: or(
        and(
          eq(ConversationsTable.senderUsername, senderUsername),
          eq(ConversationsTable.receiverUsername, receiverUsername)
        ),
        and(
          eq(ConversationsTable.senderUsername, receiverUsername),
          eq(ConversationsTable.receiverUsername, senderUsername)
        )
      ),
      with: {
        messages: true, // Eagerly load messages if conversation exists
      },
    })
  );

  if (existingConversations) {
    // If found, return the existing conversation(s) with messages
    return res.json(existingConversations);
  }

  // 2. If no conversation found, create a new one
  const [newConversationResult] = await handleAsync(
    db
      .insert(ConversationsTable)
      .values({
        receiverUsername: receiverUsername,
        senderUsername: senderUsername,
      })
      .returning() // This returns the *inserted conversation object*
  );

  // handleAsync returns an array, so destructure it.
  // newConversationResult will be like { id: 123, senderUsername: '...', receiverUsername: '...' }

  if (!newConversationResult) {
    // Handle error if insertion failed (e.g., database error)
    return res.status(500).json({ error: "Failed to create conversation" });
  }

  // 3. After successful insertion, fetch the newly created conversation
  //    along with its messages (which will be an empty array initially)
  const newlyCreatedConversationWithMessages = await handleAsync(
    db.query.ConversationsTable.findFirst({
      where: eq(ConversationsTable.id, newConversationResult.id),
      with: {
        messages: true, // Eagerly load messages for the newly created conversation
      },
    })
  );

  // Since you only inserted one, findFirst is appropriate.
  // It's possible findFirst returns null if something went wrong immediately after insert
  // (though highly unlikely in a typical scenario if insert was successful).
  if (!newlyCreatedConversationWithMessages) {
    return res
      .status(500)
      .json({ error: "Could not retrieve newly created conversation." });
  }

  // Return the newly created conversation with its messages (empty array)
  return res.json(newlyCreatedConversationWithMessages);
};

export default findOrCreateConversation;

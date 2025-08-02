import { BadRequestError, handleAsync } from "@fvoid/shared-lib";
import { db } from "@src/drizzle/db";
import { ConversationsTable, MessagesTable } from "@src/drizzle/schemas"; // Import MessagesTable
import { eq, desc, or } from "drizzle-orm"; // Import desc for ordering
import type { Request, Response } from "express";

const getConversations = async (req: Request, res: Response) => {
  const { username } = req.params;

  if (!username) throw new BadRequestError("username not defined");

  const conversations = await db.query.ConversationsTable.findMany({
    where: or(
      eq(ConversationsTable.senderUsername, username),
      eq(ConversationsTable.receiverUsername, username)
    ),
    with: {
      messages: {
        orderBy: desc(MessagesTable.createdAt),
        limit: 1,
      },
    },
  });

  // 1. Define a CTE to find the latest message for relevant conversations

  // Return the found conversation with its last message
  return res.json(conversations);
};

export default getConversations;

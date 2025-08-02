import { handleAsync } from "@fvoid/shared-lib";
import { db } from "@src/drizzle/db";
import { ConversationsTable, MessagesTable } from "@src/drizzle/schemas";
import { desc, eq } from "drizzle-orm";
import type { Request, Response } from "express";

const getConversationById = async (req: Request, res: Response) => {
  const { id } = req.params;

  // ** Prepare data

  const conversation = await handleAsync(
    db.query.ConversationsTable.findFirst({
      where: eq(ConversationsTable.id, id!),
      with: {
        messages: true,
      },
    })
  );

  return res.json(conversation);
};

export default getConversationById;

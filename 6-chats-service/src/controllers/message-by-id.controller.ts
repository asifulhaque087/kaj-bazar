import { BadRequestError, handleAsync } from "@fvoid/shared-lib";
import { db } from "@src/drizzle/db";
import { MessagesTable } from "@src/drizzle/schemas";
import { eq } from "drizzle-orm";
import type { Request, Response } from "express";

const getMessageById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) throw new BadRequestError("id not defined");

  const message = await handleAsync(
    db.query.MessagesTable.findFirst({
      where: eq(MessagesTable.id, id),
    })
  );

  return res.json(message);
};

export default getMessageById;

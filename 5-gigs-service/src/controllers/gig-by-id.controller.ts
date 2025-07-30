import { BadRequestError, handleAsync } from "@fvoid/shared-lib";
import { db } from "@src/drizzle/db";
import { GigsTable } from "@src/drizzle/schema";
import { eq } from "drizzle-orm";
import type { Request, Response } from "express";

const getGigById = async (req: Request, res: Response) => {
  const { gigId } = req.params;

  if (!gigId) throw new BadRequestError("Gig id not found");

  const gig = await handleAsync(
    db
      .select()
      .from(GigsTable)
      .where(eq(GigsTable.id, gigId))
      .limit(1)
      .then((res) => res[0])
  );

  return res.json(gig);
};

export default getGigById;

import { uploads } from "@fvoid/shared-lib";
import { db } from "@src/db";
import { GigsTable } from "@src/schemas";
import type { InsertGigInput } from "@src/validations/create-gig.validation";
import type { Request, Response } from "express";

const createGig = async (req: Request, res: Response) => {
  // extract the data
  const formData = req.body as InsertGigInput;

  // upload image to cloudinary
  const uploadResult = await uploads(formData.coverImage);

  // prepare data
  const gigData = {
    ...formData,
    coverImage: uploadResult?.secure_url,
  };

  // create a new gig
  const [newGig] = await db.insert(GigsTable).values(gigData).returning();

  return res.json(newGig);
};

export default createGig;

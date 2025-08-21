import { BadRequestError, handleAsync } from "@fvoid/shared-lib";
import { db } from "@src/drizzle/db";
import { GigsTable } from "@src/drizzle/schema";
import { updateImage } from "@src/utils/update-image-url.util";
import type { UpdateGigInput } from "@src/validations/update-gig.validation";
import { eq } from "drizzle-orm";
import type { Request, Response } from "express";

const updateGig = async (req: Request, res: Response) => {
  // extract the data
  // const formData = req.body as UpdateGigInput;
  const { id, coverImage, ...formData } = req.body as UpdateGigInput;

  const isGig = await handleAsync(
    db.query.GigsTable.findFirst({
      where: eq(GigsTable.id, id),
    })
  );

  if (!isGig) throw new BadRequestError("Id is not defined");

  // ** update image
  const updateCoverImage = await updateImage(isGig.coverImage, coverImage);

  // prepare data
  const gigData = {
    ...formData,
    coverImage: updateCoverImage,
  };

  // update a new gig
  const [updatedGig] = await db
    .update(GigsTable)
    .set(gigData)
    .where(eq(GigsTable.id, id))
    .returning();

  return res.json(updatedGig);
};

export default updateGig;

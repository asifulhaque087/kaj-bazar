import { validateData } from "@fvoid/shared-lib";
import createGig from "@src/controllers/create-gig.controller";
import seedGigs from "@src/controllers/seed-gigs.controller";
import updateGig from "@src/controllers/update-gig.controller";
import { insertGigSchema } from "@src/validations/create-gig.validation";
import { updateGigSchema } from "@src/validations/update-gig.validation";
import { Router, type Request, type Response } from "express";

const mutationRouter = Router();

mutationRouter.post("/create", validateData(insertGigSchema), createGig);

mutationRouter.put("/seed/:count", seedGigs);

mutationRouter.put("/active/:gigId", (req: Request, res: Response) => {
  return res.json({ m: "I am from get  active gig by gig  id" });
});

mutationRouter.put("/update", validateData(updateGigSchema), updateGig);

mutationRouter.delete("/:gigId/:sellerId", (req: Request, res: Response) => {
  return res.json({ m: "I am from Delete Gig" });
});

export default mutationRouter;

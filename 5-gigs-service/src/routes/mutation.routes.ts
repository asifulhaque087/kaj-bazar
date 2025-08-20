import createGig from "@src/controllers/create-gig.controller";
import seedGigs from "@src/controllers/seed-gigs.controller";
import { Router, type Request, type Response } from "express";

const mutationRouter = Router();

mutationRouter.post("/create", createGig);

mutationRouter.put("/seed/:count", seedGigs);

mutationRouter.put("/active/:gigId", (req: Request, res: Response) => {
  return res.json({ m: "I am from get  active gig by gig  id" });
});

mutationRouter.put("/:gigId", (req: Request, res: Response) => {
  return res.json({ m: "I am from Update Gig" });
});

mutationRouter.delete("/:gigId/:sellerId", (req: Request, res: Response) => {
  return res.json({ m: "I am from Delete Gig" });
});

export default mutationRouter;

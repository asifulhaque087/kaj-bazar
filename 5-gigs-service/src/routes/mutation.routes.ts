import { Router, type Request, type Response } from "express";

const mutationRouter = Router();

mutationRouter.post("/create", (req: Request, res: Response) => {
  return res.json({ m: "I am from Create Gigs" });
});

mutationRouter.put("/:gigId", (req: Request, res: Response) => {
  return res.json({ m: "I am from Update Gig" });
});

mutationRouter.put("/active/:gigId", (req: Request, res: Response) => {
  return res.json({ m: "I am from get  active gig by gig  id" });
});

mutationRouter.put("/seed/:count", (req: Request, res: Response) => {
  return res.json({ m: "I am from Seed Gig" });
});

mutationRouter.delete("/:gigId/:sellerId", (req: Request, res: Response) => {
  return res.json({ m: "I am from Delete Gig" });
});

export default mutationRouter;

import type { Request, Response } from "express";

const updateGig = (req: Request, res: Response) => {
  return res.json({ m: "I am from update Gig" });
};

export default updateGig;

import type { Request, Response } from "express";

const createGig = (req: Request, res: Response) => {
  return res.json({ m: "I am from create Gig" });
};

export default createGig;

import type { Request, Response } from "express";

const getGigById = (req: Request, res: Response) => {
  return res.json({ m: "I am from Get Gig by id" });
};

export default getGigById;

import type { Request, Response } from "express";

const searchGigs = (req: Request, res: Response) => {
  return res.json({ m: "I am from search gigs" });
};

export default searchGigs;

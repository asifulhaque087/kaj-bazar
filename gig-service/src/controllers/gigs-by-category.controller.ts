import type { Request, Response } from "express";

const getGigsByCategory = (req: Request, res: Response) => {
  return res.json({ m: "I am from Get Gigs by Category" });
};

export default getGigsByCategory;

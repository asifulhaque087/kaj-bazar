import type { Request, Response } from "express";

const getBuyerByName = (req: Request, res: Response) => {
  return res.json({ m: "I am from get Buyer by name" });
};

export default getBuyerByName;

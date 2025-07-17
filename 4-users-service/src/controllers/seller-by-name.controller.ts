import type { Request, Response } from "express";

const getSellerByName = (req: Request, res: Response) => {
  return res.json({ m: "I am from get seller by name" });
};

export default getSellerByName;

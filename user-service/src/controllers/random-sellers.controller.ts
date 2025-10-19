import type { Request, Response } from "express";

const getRandomSeller = (req: Request, res: Response) => {
  return res.json({ m: "I am from random seller" });
};

export default getRandomSeller;

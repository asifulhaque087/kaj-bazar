import type { Request, Response } from "express";

const createSeller = (req: Request, res: Response) => {
  return res.json({ m: "I am from create seller" });
};

export default createSeller;

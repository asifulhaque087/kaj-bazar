import type { Request, Response } from "express";

const updateSeller = (req: Request, res: Response) => {
  return res.json({ m: "I am from updateSeller" });
};

export default updateSeller;

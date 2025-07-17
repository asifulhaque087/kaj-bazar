import type { Request, Response } from "express";

const currentBuyer = (req: Request, res: Response) => {
  return res.json({ m: "I am from current buyer" });
};

export default currentBuyer;

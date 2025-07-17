import type { Request, Response } from "express";

const seedSeller = (req: Request, res: Response) => {
  return res.json({ m: "I am from seed seller" });
};

export default seedSeller;

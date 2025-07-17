import type { Request, Response } from "express";

const getSellerInactiveGigs = (req: Request, res: Response) => {
  return res.json({ m: "I am from Get Seller In Active Gigs" });
};

export default getSellerInactiveGigs;

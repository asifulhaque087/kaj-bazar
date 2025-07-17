import type { Request, Response } from "express";

const getSellerGigs = (req: Request, res: Response) => {
  return res.json({ m: "I am from Get Seller Gigs" });
};

export default getSellerGigs;

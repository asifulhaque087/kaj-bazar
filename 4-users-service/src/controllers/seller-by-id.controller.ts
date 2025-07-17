import type { Request, Response } from "express";

const getSellerById = (req: Request, res: Response) => {
  return res.json({ m: "I am from get seller by id" });
};

export default getSellerById;

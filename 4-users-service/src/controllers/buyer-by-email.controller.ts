import type { Request, Response } from "express";

const getBuyerByEmail = async (req: Request, res: Response) => {
  const email = "example@exam.com";

  // const buyer = await handleAsync(
  //   db
  //     .select()
  //     .from(BuyersTable)
  //     .where(eq(BuyersTable.email, email))
  //     .limit(1)
  //     .then((res) => res[0])
  // );

  // return res.json({ message: "Buyer profile", buyer });

  return res.json({ m: "I am from get Buyer by email" });
};

export default getBuyerByEmail;

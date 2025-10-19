import { GetSellersPublisher } from "@src/events/publishers/get-sellers.publisher";
import { mqWrapper } from "@src/rabbitmq-wrapper";
import type { Request, Response } from "express";

const seedGigs = (req: Request, res: Response) => {
  const { count = "10" } = req.params;

  const total = parseInt(count);

  new GetSellersPublisher(mqWrapper.channel).publish({
    count: total,
  });

  return res.json({ message: "Gigs created successfully" });
};

export default seedGigs;

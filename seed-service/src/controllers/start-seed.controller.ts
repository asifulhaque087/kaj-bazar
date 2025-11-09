import { AuthSeedRequestedPublisher } from "@src/events/publishers/auth-seed-requested.publisher";
import { mqWrapper } from "@src/rabbitmq-wrapper";
import type { Request, Response } from "express";

const startSeed = async (req: Request, res: Response) => {
  new AuthSeedRequestedPublisher(mqWrapper.channel).publish({ count: 100 });

  return res.json({ message: "hello" });
};

export default startSeed;

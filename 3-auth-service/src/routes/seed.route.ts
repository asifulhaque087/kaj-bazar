// ** Third party imports
import { Router, type Request, type Response } from "express";

const seedRouter = Router();

// ** Seed Auth Data
seedRouter.put("/seed/:count", async (req: Request, res: Response) => {
  res.json({ message: "I am from seed auth data" });
});

export default seedRouter;

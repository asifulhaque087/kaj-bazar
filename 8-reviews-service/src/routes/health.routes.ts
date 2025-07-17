// ** Third party imports
import { Router, type Request, type Response } from "express";

const healthRouter = Router();

// ** Check Health
healthRouter.get("/review-health", (_req: Request, res: Response) => {
  return res.send("Reviews server is running");
});

export default healthRouter;

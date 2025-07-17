// ** Third party imports
import { Router, type Request, type Response } from "express";

const healthRouter = Router();

// ** Check Health
healthRouter.get("/auth-health", (_req: Request, res: Response) => {
  return res.send("Auth server is running");
});

export default healthRouter;

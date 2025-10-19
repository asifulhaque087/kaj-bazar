// ** Third party imports
import { Router, type Request, type Response } from "express";

const healthRouter = Router();

// ** Check Health
healthRouter.get("/users-health", (_req: Request, res: Response) => {
  return res.send("Users server is running");
});

export default healthRouter;

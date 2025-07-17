// ** Third party imports
import { Router, type Request, type Response } from "express";

const healthRouter = Router();

// ** Check Health
healthRouter.get("/chats-health", (_req: Request, res: Response) => {
  return res.send("Chats server is running");
});

export default healthRouter;

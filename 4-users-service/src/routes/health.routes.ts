// ** Third party imports
import { Router } from "express";

const healthRouter = Router();

// ** Check Health
healthRouter.get("/user-health", (_req, res) => {
  return res.send("User server is running");
});

export default healthRouter;

// ** Third party imports
import { Router } from "express";

const healthRouter = Router();

// ** Check Health
healthRouter.get("/auth-health", (_req, res) => {
  return res.send("Auth server is running");
});

export default healthRouter;

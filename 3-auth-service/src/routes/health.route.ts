// ** Third party imports
import { Hono } from "hono";

const healthRouter = new Hono();

// ** Check Health
healthRouter.get("/auth-health", (c) => {
  return c.text("Auth server is running");
});

export default healthRouter;

import { Hono } from "hono";

const healthRouter = new Hono();

healthRouter.get("/gateway-health", (c) => {
  return c.text("Gateway server is running");
});

export default healthRouter

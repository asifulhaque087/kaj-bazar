// ** Third party imports
import { Hono } from "hono";

const seedRouter = new Hono();

// ** Seed Auth Data
seedRouter.put("/seed/:count", async (c) => {
  return c.json({ message: "I am from seed auth data" });
});

export default seedRouter;

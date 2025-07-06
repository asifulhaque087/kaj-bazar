// ** Third party imports
import { Hono } from "hono";

const identityRouter = new Hono();

// **
identityRouter.get("/refresh-token/:username", async (c) => {
  return c.json({ message: "I am from refresh token" });
});

// **
identityRouter.get("/currentuser", async (c) => {
  return c.json({ message: "I am from current user" });
});

export default identityRouter;

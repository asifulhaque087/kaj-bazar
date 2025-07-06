// ** Third party imports
import { Hono } from "hono";

const loginRegisterRouter = new Hono();

// ** Sign Up An User
loginRegisterRouter.post("/signup", async (c) => {
  return c.json({ message: "I am from signup" });
});

// ** Sign In An User
loginRegisterRouter.post("/signin", async (c) => {
  return c.json({ message: "I am from login" });
});

export default loginRegisterRouter;

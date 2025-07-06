// ** Third party imports
import { Hono } from "hono";

const verficationRouter = new Hono();

// ** Email verfication
verficationRouter.put("/verify-email", async (c) => {
  return c.json({ message: "I am from email verification" });
});

// ** Opt verfication
verficationRouter.put("/verify-otp/:otp", async (c) => {
  return c.json({ message: "I am from opt verification" });
});

// ** Resend Email
verficationRouter.post("/resend-email", async (c) => {
  return c.json({ message: "I am from resend email" });
});

export default verficationRouter;

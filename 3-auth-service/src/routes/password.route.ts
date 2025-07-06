// ** Third party imports
import { Hono } from "hono";

const passwordRouter = new Hono();

// ** Forgot Password
passwordRouter.put("/forgot-password", async (c) => {
  return c.json({ message: "I am from forgot password" });
});

// ** Reset Password
passwordRouter.put("/reset-password/:token", async (c) => {
  return c.json({ message: "I am from reset password" });
});

// ** Change Password
passwordRouter.put("/change-password", async (c) => {
  return c.json({ message: "I am from change password" });
});

export default passwordRouter;

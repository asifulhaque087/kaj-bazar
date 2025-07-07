// import type { SessionData } from "@src/app";
import { authService } from "@src/axios-services/auth.axios";
import type { AxiosResponse } from "axios";
import { Hono } from "hono";
import type { Session } from "hono-sessions";

type SessionData = {
  jwt?: string;
  userId?: string;
};

// type JwtPayload = {
//   userId: string;
//   email: string;
// };

type AppVariables = {
  session: Session<SessionData>;
  //   jwtPayload?: JwtPayload;
};

const authRouter = new Hono<{ Variables: AppVariables }>();

authRouter.post("/auth/signup", async (c) => {
  const body = await c.req.parseBody();

  const response: AxiosResponse = await authService.signUp(body);

  const session = c.get("session");
  session.set("jwt", response.data.token);

  return c.json({
    message: response.data.message,
    user: response.data.user,
  });
});

authRouter.post("/auth/signin", async (c) => {
  return c.json({});
});

authRouter.post("/auth/signout", async (c) => {
  return c.json({});
});

authRouter.put("/auth/verify-email", async (c) => {
  return c.json({});
});

authRouter.put("/auth/verify-otp/:otp", async (c) => {
  return c.json({});
});

authRouter.put("/auth/forgot-password", async (c) => {
  return c.json({});
});

authRouter.put("/auth/reset-password/:token", async (c) => {
  return c.json({});
});

authRouter.put("/auth/change-password", async (c) => {
  return c.json({});
});

authRouter.put("/auth/seed/:count", async (c) => {
  return c.json({});
});

export default authRouter;

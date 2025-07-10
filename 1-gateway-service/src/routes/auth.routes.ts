import { AxiosService } from "@src/axios-services/axios";
import { config } from "@src/config";
import { apiMiddleware } from "@src/middlewares/api.middleware";
import { verifyJwtToken } from "@src/middlewares/verify-jwt.middleware";
import type { AxiosResponse } from "axios";
import { AxiosError } from "axios";
import { Hono } from "hono";
import type { Session } from "hono-sessions";
import type { ContentfulStatusCode } from "hono/utils/http-status";

type SessionData = {
  jwt?: string;
  userId?: string;
};

type AppVariables = {
  session: Session<SessionData>;
  publicAxios: AxiosService;
};

// ** Create Hono App
const authRouter = new Hono<{ Variables: AppVariables }>();

// ** Create APi services
authRouter.use(apiMiddleware(`${config.AUTH_BASE_URL}/api/v1/auth`, "auth"));

// ** Signup Route Handler
authRouter.post(
  "/auth/signup",

  async (c) => {
    const body = await c.req.json();

    try {
      // request to auth service
      const publicAxios = c.get("publicAxios");
      const response: AxiosResponse = await publicAxios.axios.post(
        "/signup",
        body
      );

      // set jwt
      const session = c.get("session");
      session.set("jwt", response.data.token);

      // response data
      return c.json({
        message: response.data.message,
        user: response.data.user,
      });
    } catch (error) {
      if (!(error instanceof AxiosError && error.response))
        throw new Error("Server Error");

      return c.json(
        error.response.data,
        error.response.status as ContentfulStatusCode
      );
    }
  }
);

authRouter.post("/auth/signin", async (c) => {
  const body = await c.req.json();

  try {
    // forward req to auth service
    const publicAxios = c.get("publicAxios");
    const response: AxiosResponse = await publicAxios.axios.post(
      "/signin",
      body
    );

    // set jwt to session
    const session = c.get("session");
    session.set("jwt", response.data.token);

    // return response
    return c.json(response.data);
  } catch (error) {
    // return errors

    if (!(error instanceof AxiosError && error.response))
      throw new Error("Server Error");

    return c.json(
      error.response.data,
      error.response.status as ContentfulStatusCode
    );
  }
});

authRouter.post("/auth/signout", verifyJwtToken, async (c) => {
  return c.json({ token: "bearerToken" });
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

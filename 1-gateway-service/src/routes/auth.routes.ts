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

// ** Signin Route Handler
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

// ** Signout Route Handler
authRouter.post("/auth/signout", verifyJwtToken, async (c) => {
  return c.json({ token: "bearerToken" });
});

// ** Verify Email Route Handler
authRouter.put("/auth/verify-email", verifyJwtToken, async (c) => {
  const body = await c.req.json();

  try {
    // forward req to auth service
    const protectedAxios = c.get("protectedAxios");
    const response: AxiosResponse = await protectedAxios.axios.put(
      "/verify-email",
      body
    );

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

// ** Verify Otp Route Handler
authRouter.put("/auth/verify-otp/:otp", verifyJwtToken, async (c) => {
  const otp = c.req.param("otp");

  try {
    // forward req to auth service
    const protectedAxios = c.get("protectedAxios");
    const response: AxiosResponse = await protectedAxios.axios.put(
      `/verify-otp/${otp}`
    );

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

// ** Resend Email Route Handler
authRouter.post("/auth/resend-email", async (c) => {
  const body = await c.req.json();

  try {
    // forward req to auth service
    const apiService = c.get("publicAxios");
    const response: AxiosResponse = await apiService.axios.post(
      "/resend-email",
      body
    );

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

authRouter.put("/auth/forgot-password", async (c) => {
  const body = await c.req.json();

  try {
    // forward req to auth service
    const apiService = c.get("publicAxios");
    const response: AxiosResponse = await apiService.axios.put(
      "/forgot-password",
      body
    );

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

authRouter.put("/auth/reset-password/:token", async (c) => {
  const body = await c.req.json();
  const { token } = c.req.param();

  try {
    // forward req to auth service
    const apiService = c.get("publicAxios");
    const response: AxiosResponse = await apiService.axios.put(
      `/reset-password/${token}`,
      body
    );

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

authRouter.put("/auth/change-password", verifyJwtToken, async (c) => {
  const body = await c.req.json();

  try {
    // forward req to auth service
    const apiService = c.get("protectedAxios");
    const response: AxiosResponse = await apiService.axios.put(
      "/change-password",
      body
    );

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

authRouter.get("/auth/refresh-token", verifyJwtToken, async (c) => {
});

authRouter.get("/auth/currentuser", verifyJwtToken, async (c) => {
  try {
    // forward req to auth service
    const apiService = c.get("protectedAxios");
    const response: AxiosResponse = await apiService.axios.get("/currentuser");

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

authRouter.put("/auth/seed/:count", async (c) => {
  return c.json({});
});

export default authRouter;

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

class AuthRoutes {
  private router: Hono<{ Variables: AppVariables }>;

  constructor() {
    this.router = new Hono<{ Variables: AppVariables }>();
  }

  public routes(): Hono<{ Variables: AppVariables }> {
    this.router.post("/auth/signup", async (c) => {
      const body = await c.req.parseBody();

      const response: AxiosResponse = await authService.signUp(body);

      const session = c.get("session");
      session.set("jwt", response.data.token);

      return c.json({
        message: response.data.message,
        user: response.data.user,
      });
    });

    this.router.post("/auth/signin", async (c) => {
      return c.json({});
    });

    this.router.post("/auth/signout", async (c) => {
      return c.json({});
    });

    this.router.put("/auth/verify-email", async (c) => {
      return c.json({});
    });

    this.router.put("/auth/verify-otp/:otp", async (c) => {
      return c.json({});
    });

    this.router.put("/auth/forgot-password", async (c) => {
      return c.json({});
    });

    this.router.put("/auth/reset-password/:token", async (c) => {
      return c.json({});
    });

    this.router.put("/auth/change-password", async (c) => {
      return c.json({});
    });

    this.router.put("/auth/seed/:count", async (c) => {
      return c.json({});
    });

    return this.router;
  }
}

export const authRoutes: AuthRoutes = new AuthRoutes();

// // usecase
// const { message, user, token, browserName, deviceType } = authServiceResponse;

// // 2. Set JWT in session
// const session = c.get('session'); // Get the session object from Hono's context
// session.set('jwt', token); // 'hono-sessions' will manage setting the cookie

// // You can set other session data too
// session.set('userId', user.id);

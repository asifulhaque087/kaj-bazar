import { Hono } from "hono";
import { logger } from "hono/logger";
import { errorHandler } from "@fvoid/shared-lib";
import { NotFoundError } from "@fvoid/shared-lib";
import { sessionMiddleware, CookieStore } from "hono-sessions";
import { cors } from "hono/cors";
import searchRouter from "@src/routes/search.routes";
import authRouter from "@src/routes/auth.routes";
import healthRouter from "@src/routes/health.routes";
import { config } from "@src/config";

//** Set up your Hono
const app = new Hono();

// ** Security middlewares
app.use(
  "*",
  sessionMiddleware({
    // sessionCookieName: "honoSession",
    store: new CookieStore(),
    encryptionKey: config.SECRET_KEY_ONE,
    expireAfterSeconds: 24 * 7 * 3600,
    cookieOptions: {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    },
  })
);

app.use(
  "*",
  cors({
    origin: config.CLIENT_URL, // Matches 'origin'
    credentials: true, // Matches 'credentials'
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Matches 'methods'
    allowHeaders: ["Content-Type", "Authorization"], // Matches 'allowedHeaders'
  })
);

// ** Route middleware
app.use("*", logger());

const BASE_PATH = "/api/v1/gateway";

app.route(BASE_PATH, searchRouter);

app.route(BASE_PATH, authRouter);

app.route("/", healthRouter);

// ** Error middleware

app.notFound(async () => {
  throw new NotFoundError();
});

app.onError(errorHandler);

export default app;

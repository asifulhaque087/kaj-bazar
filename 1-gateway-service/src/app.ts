import { Hono } from "hono";
import { logger } from "hono/logger";
import { errorHandler } from "@fvoid/shared-lib";
import { NotFoundError } from "@fvoid/shared-lib";
import { sessionMiddleware, CookieStore, Session } from "hono-sessions";
import { cors } from "hono/cors";
import { axiosAuthInstance } from "./axios-services/auth.axios";
import { authRoutes } from "./routes/auth.routes";
import { searchRoutes } from "./routes/search.routes";

export type SessionData = {
  jwt?: string;
  userId?: string;
};

// Set up your Hono instance with session variables type
const app = new Hono<{
  Variables: {
    session: Session<SessionData>;
  };
}>();

const config = {
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",

  SECRET_KEY:
    process.env.SESSION_SECRET ||
    "a_very_secret_key_at_least_32_characters_long_for_production",
};

// ** security middlewares

app.use(
  "*",
  sessionMiddleware({
    sessionCookieName: "hono-session",
    store: new CookieStore(),
    encryptionKey: config.SECRET_KEY,
    expireAfterSeconds: 24 * 7 * 3600,
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    },
  })
);

// --- CORS Middleware Configuration ---
app.use(
  "*",
  cors({
    origin: config.CLIENT_URL, // Matches 'origin'
    credentials: true, // Matches 'credentials'
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Matches 'methods'
    allowHeaders: ["Content-Type", "Authorization"], // Matches 'allowedHeaders'
  })
);

app.use(async (c, next) => {
  const session = c.get("session");
  const jwt = session.get("jwt");

  // console.log("calling from ");

  if (jwt) {
    axiosAuthInstance.defaults.headers["Authorization"] = `Bearer ${jwt}`;
  }
  return next();
});

// route middleware

app.use("*", logger());

const BASE_PATH = "/api/gateway/v1";

app.route(BASE_PATH, searchRoutes.routes());

app.route(BASE_PATH, authRoutes.routes());

app.get("/books", (c) => c.json("list books"));

app.get("/gateway-health", (c) => {
  return c.text("Gateway server is running");
});

// Error middleware

app.notFound(async () => {
  throw new NotFoundError();
});

app.onError(errorHandler);

export default app;

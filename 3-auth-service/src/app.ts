import { Hono } from "hono";
import { logger } from "hono/logger";
import { errorHandler } from "@fvoid/shared-lib";
import { NotFoundError } from "@fvoid/shared-lib";
import { cors } from "hono/cors";
import { config } from "./config";

const app = new Hono();

// ** Security Middlewares

app.use(
  "*",
  cors({
    origin: config.CLIENT_URL, // Matches 'origin'
    credentials: true, // Matches 'credentials'
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Matches 'methods'
    allowHeaders: ["Content-Type", "Authorization"], // Matches 'allowedHeaders'
  })
);

//**  Route Middleware

app.use("*", logger());

const BASE_PATH = "/api/gateway/v1";

// app.route(BASE_PATH, searchRoutes.routes());

// app.route(BASE_PATH, authRoutes.routes());

app.get("/auth-health", (c) => {
  return c.text("Auth server is running");
});

//** Error middleware

app.notFound(async () => {
  throw new NotFoundError();
});

app.onError(errorHandler);

export default app;

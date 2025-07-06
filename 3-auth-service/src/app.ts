import { Hono } from "hono";
import { logger } from "hono/logger";
import { errorHandler } from "@fvoid/shared-lib";
import { NotFoundError } from "@fvoid/shared-lib";
import { cors } from "hono/cors";
import { config } from "@src/config";
import loginRegisterRouter from "@src/routes/login-register.route";
import verficationRouter from "@src/routes/verification.route";
import passwordRouter from "@src/routes/password.route";
import identityRouter from "@src/routes/identity.route";
import healthRouter from "@src/routes/health.route";
import seedRouter from "@src/routes/seed.route";

const app = new Hono();

// ** Security Middlewares

app.use(
  "*",
  cors({
    origin: config.API_GATEWAY_URL, // Matches 'origin'
    credentials: true, // Matches 'credentials'
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Matches 'methods'
    allowHeaders: ["Content-Type", "Authorization"], // Matches 'allowedHeaders'
  })
);

//**  Route Middleware

app.use("*", logger());

const BASE_PATH = "/api/auth/v1";

app.route("/", healthRouter);
app.route(BASE_PATH, loginRegisterRouter);
app.route(BASE_PATH, verficationRouter);
app.route(BASE_PATH, passwordRouter);
app.route(BASE_PATH, identityRouter);
app.route(BASE_PATH, seedRouter);

//** Error middleware

app.notFound(async () => {
  throw new NotFoundError();
});

app.onError(errorHandler);

export default app;

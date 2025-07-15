import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieSession from "cookie-session";

import healthRouter from "@src/routes/health.routes";
import { config } from "@src/config";
import { errorHandler, NotFoundError } from "@fvoid/shared-lib";

// **  Create Applicaiton
const app = express();

// ** Body Parser Middleware (to parse JSON request bodies)
// Hono parses JSON by default, Express needs explicit middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For URL-encoded bodies

// ** Security Middlewares

app.use(
  cookieSession({
    name: "session",
    keys: [config.SECRET_KEY_ONE],
    maxAge: 24 * 7 * 3600 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  })
);

app.use(
  cors({
    origin: config.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ** Route Middlewares

app.use(morgan("dev"));

const BASE_PATH = "/api/v1/gateway";

app.use(healthRouter);


// ** 404 Not Found Handler
app.get("*", () => {
  throw new NotFoundError();
});

// ** Global Error Handler
app.use(errorHandler);

// ** Listen App
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Gateway server is running on port ${PORT}`);
});

export default app;

// ########################

// Import necessary modules for Express.js
import express from "express";
import morgan from "morgan"; // For logging, equivalent to Hono's logger
import cors from "cors"; // For CORS handling
import cookieSession from "cookie-session"; // For session management, equivalent to hono-sessions CookieStore

// Assuming these are custom modules, import them as they are
import { NotFoundError, errorHandler } from "@fvoid/shared-lib";
import searchRouter from "@src/routes/search.routes";
import authRouter from "@src/routes/auth.routes";
import healthRouter from "@src/routes/health.routes";
import { config } from "@src/config"; // Your configuration module

// ** Set up your Express app
const app = express();

// ** Security middlewares
app.use(
  cookieSession({
    name: "session",
    keys: [config.SECRET_KEY_ONE],
    maxAge: 24 * 7 * 3600 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  })
);

// CORS middleware
app.use(
  cors({
    origin: config.CLIENT_URL, // Matches 'origin'
    credentials: true, // Matches 'credentials'
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Matches 'allowMethods'
    allowedHeaders: ["Content-Type", "Authorization"], // Matches 'allowHeaders'
  })
);

// ** Route middleware
app.use(morgan("dev")); // 'dev' is a common format, you can choose others like 'combined', 'tiny', etc.

const BASE_PATH = "/api/v1/gateway";

// Mount the routers
// app.use(BASE_PATH, searchRouter);
// app.use(BASE_PATH, authRouter);
app.use("/", healthRouter);

// ** Error middleware

app.use((req, res, next) => {
  // If no route handled the request, it means it's a 404
  next(new NotFoundError());
});

// app.use(errorHandler);

export default app;

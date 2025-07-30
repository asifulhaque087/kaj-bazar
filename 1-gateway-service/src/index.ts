import express from "express";
import "express-async-errors";
import morgan from "morgan";
import cors from "cors";
import cookieSession from "cookie-session";
import healthRouter from "@src/routes/health.routes";
import { config } from "@src/config";
import { errorHandler, NotFoundError } from "@fvoid/shared-lib";
import authRouter from "@src/routes/auth.routes";
import gigRouter from "@src/routes/gigs.routes";
import buyerRouter from "@src/routes/buyers.routes";
import sellerRouter from "@src/routes/sellers.routes";
import chatRouter from "@src/routes/chats.routes";

// **  Create Applicaiton
const app = express();

// ** Standart Middlewares

// Body Parser Middleware (to parse JSON request bodies)

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true })); // For URL-encoded bodies

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

app.use(`${BASE_PATH}/auth`, authRouter);
app.use(`${BASE_PATH}/buyers`, buyerRouter);
app.use(`${BASE_PATH}/sellers`, sellerRouter);
app.use(`${BASE_PATH}/gigs`, gigRouter);
app.use(`${BASE_PATH}/chats`, chatRouter);

// ** Error Handler Middlewares

app.get("*", async (req, res, next) => {
  next(new NotFoundError());
  // throw new NotFoundError();
});

app.use(errorHandler);

// ** Listen App

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Gateway server is running on port ${PORT}`);
});

export default app;

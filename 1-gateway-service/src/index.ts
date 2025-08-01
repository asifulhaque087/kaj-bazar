// ** Third Party Imports
import express, { type Application } from "express";
import "express-async-errors";
import cors from "cors";
import morgan from "morgan";
import { errorHandler, NotFoundError } from "@fvoid/shared-lib";
import http from "http";

import { Server } from "socket.io";

// ** Local Imports
import { config } from "@src/config";
import healthRouter from "@src/routes/health.routes";
import cookieSession from "cookie-session";
import authRouter from "@src/routes/auth.routes";
import buyerRouter from "@src/routes/buyers.routes";
import sellerRouter from "@src/routes/sellers.routes";
import gigRouter from "@src/routes/gigs.routes";
import chatRouter from "@src/routes/chats.routes";
import { createClient } from "redis";
import { createAdapter } from "@socket.io/redis-adapter";
import { SocketIOAppHandler } from "@src/sockets/socket";
// ** Define Service

class Service {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public async start() {
    this.set_standard_middlewares();
    this.set_security_middlewares();
    this.set_route_middlewares();
    // this.start_rabbitmq();
    this.set_error_middlewares();
    await this.start_server();
  }

  private set_standard_middlewares() {
    this.app.use(express.json({ limit: "50mb" }));
    this.app.use(express.urlencoded({ limit: "50mb", extended: true })); // For URL-encoded bodies
  }

  private set_security_middlewares() {
    this.app.use(
      cookieSession({
        name: "session",
        keys: [config.SECRET_KEY_ONE],
        maxAge: 24 * 7 * 3600 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
    );

    this.app.use(
      cors({
        origin: config.CLIENT_URL,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );
  }

  private set_route_middlewares() {
    this.app.use(morgan("dev"));

    const BASE_PATH = "/api/v1/gateway";

    this.app.use(healthRouter);

    this.app.use(`${BASE_PATH}/auth`, authRouter);
    this.app.use(`${BASE_PATH}/buyers`, buyerRouter);
    this.app.use(`${BASE_PATH}/sellers`, sellerRouter);
    this.app.use(`${BASE_PATH}/gigs`, gigRouter);
    this.app.use(`${BASE_PATH}/chats`, chatRouter);
  }

  private set_error_middlewares() {
    this.app.use("*", async function (req, res, next) {
      next(new NotFoundError());
    });

    this.app.use(errorHandler);
  }

  private async start_server() {
    // create express app
    // create http server
    // start http server
    // create io using http server
    // create pub sub using io
    // create a new instance of socket using io

    const PORT = 4000;

    const httpServer = new http.Server(this.app);

    httpServer.listen(PORT, () => {
      console.log(`Chats server running on port ${PORT}`);
    });

    const io = new Server(httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      },
    });

    const pubClient = createClient({ url: config.REDIS_HOST });
    const subClient = pubClient.duplicate();
    await Promise.all([pubClient.connect(), subClient.connect()]);
    io.adapter(createAdapter(pubClient, subClient));

    const socketIoApp = new SocketIOAppHandler(io);
    socketIoApp.listen();
  }
}

// ** Create & Start Application

const app = express();

const server = new Service(app);

await server.start();

// const initiate = async () => {
//   await server.start();
// };

// initiate();

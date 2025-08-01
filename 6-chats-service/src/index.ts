// ** Third Party Imports
import express, { type Application } from "express";
import "express-async-errors";
import cors from "cors";
import morgan from "morgan";
import {
  configureCloudinary,
  errorHandler,
  NotFoundError,
  verifyGatewayToken,
} from "@fvoid/shared-lib";
import http from "http";

// ** Local Imports
import { config } from "@src/config";
import { mqWrapper } from "@src/rabbitmq-wrapper";
import healthRouter from "@src/routes/health.routes";
import queryRouter from "@src/routes/query.routes";
import mutationRouter from "@src/routes/mutation.routes";
import conversationRouter from "@src/routes/conversation.routes";
import messageRouter from "@src/routes/message.routes";
import { initializeGatewayClient } from "@src/socket/gatewayClient";
// ** Define Service

class Service {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public start() {
    this.load_configurations();
    this.set_standard_middlewares();
    this.set_security_middlewares();
    this.set_route_middlewares();
    // this.start_rabbitmq();
    this.set_error_middlewares();
    this.start_server();
  }

  private load_configurations() {
    configureCloudinary({
      cloud_name: config.CLOUD_NAME,
      api_key: config.CLOUD_API_KEY,
      api_secret: config.CLOUD_API_SECRET,
    });
  }

  private set_standard_middlewares() {
    this.app.use(express.json({ limit: "50mb" }));
    this.app.use(express.urlencoded({ limit: "50mb", extended: true })); // For URL-encoded bodies
  }

  private set_security_middlewares() {
    this.app.use(
      cors({
        origin: "*",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      })
    );

    this.app.use(verifyGatewayToken(config.GATEWAY_JWT_TOKEN, "chats"));
  }

  private set_route_middlewares() {
    this.app.use(morgan("dev"));
    const BASE_PATH = "/api/v1/chats";
    this.app.use(healthRouter);
    // this.app.use(`${BASE_PATH}/conversation`, conversationRouter);
    this.app.use(BASE_PATH, conversationRouter);
    this.app.use(BASE_PATH, messageRouter);
    // this.app.use(BASE_PATH, queryRouter);
    // this.app.use(BASE_PATH, mutationRouter);
  }

  private async start_rabbitmq() {
    await mqWrapper.connect(config.RABBITMQ_ENDPOINT);
    process.once("SIGINT", async () => {
      await mqWrapper.channel.close();
      await mqWrapper.connection.close();
    });
  }

  private set_error_middlewares() {
    this.app.use("*", function (req, res, next) {
      next(new NotFoundError());
    });

    this.app.use(errorHandler);
  }

  private start_server() {
    const PORT = 4005;

    this.app.listen(PORT, () => {
      console.log(`Chats server is running on port ${PORT}`);
    });

    initializeGatewayClient();
  }
}

// ** Create & Start Application

const app = express();

const server = new Service(app);

server.start();

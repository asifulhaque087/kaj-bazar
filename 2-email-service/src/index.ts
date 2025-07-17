// ** Third Party Imports
import express, { type Application } from "express";
import "express-async-errors";
import cors from "cors";
import { errorHandler, NotFoundError } from "@fvoid/shared-lib";

// ** Local Imports
import { config } from "@src/config";
import { mqWrapper } from "@src/rabbitmq-wrapper";
import healthRouter from "@src/routes/health.routes";
import { SendEmailListener } from "@src/events/listeners/send-email-listener";

// ** Define Service

class Service {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public start() {
    this.set_standard_middlewares();
    this.set_security_middlewares();
    this.set_route_middlewares();
    this.start_rabbitmq();
    this.set_error_middlewares();
    this.start_server();
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
  }

  private set_route_middlewares() {
    const BASE_PATH = "/api/v1/users";
    this.app.use(healthRouter);
  }

  private async start_rabbitmq() {
    await mqWrapper.connect(config.RABBITMQ_ENDPOINT);
    process.once("SIGINT", async () => {
      await mqWrapper.channel.close();
      await mqWrapper.connection.close();
    });

    new SendEmailListener(mqWrapper.channel).listen();
  }

  private set_error_middlewares() {
    this.app.use("*", function (req, res, next) {
      next(new NotFoundError());
    });

    this.app.use(errorHandler);
  }

  private start_server() {
    const PORT = 4001;
    this.app.listen(PORT, () => {
      console.log(`Email server is running on port ${PORT}`);
    });
  }
}

// ** Create & Start Application

const app = express();

const server = new Service(app);

server.start();

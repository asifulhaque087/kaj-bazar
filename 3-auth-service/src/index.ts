// ** Third Party Imports
import express, { type Application } from "express";
import cors from "cors";
import morgan from "morgan"; // A popular HTTP request logger middleware for node.js
import {
  configureCloudinary,
  errorHandler,
  NotFoundError,
} from "@fvoid/shared-lib";

// ** Local Imports
import { config } from "@src/config";
// import loginRegisterRouter from "@src/routes/login-register.route";
// import verficationRouter from "@src/routes/verification.route";
// import passwordRouter from "@src/routes/password.route";
// import identityRouter from "@src/routes/identity.route";
// import healthRouter from "@src/routes/health.route";
// import seedRouter from "@src/routes/seed.route";
// import { mqWrapper } from "@src/rabbitmq-wrapper";
import { verifyGatewayToken } from "@src/middlewares/verfiyGatewayToken.middleware";

class AuthService {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public start() {
    this.load_configurations();
    this.set_standard_middlewares();
    this.set_security_middlewares();
    // this.set_route_middlewares();
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
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true })); // For URL-encoded bodies
  }

  private set_security_middlewares() {
    this.app.use(
      cors({
        origin: "*",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      })
    );

    this.app.use(verifyGatewayToken(config.GATEWAY_JWT_TOKEN, "auth"));
  }

  private set_route_middlewares() {
    // this.app.use(morgan("dev"));
    // const BASE_PATH = "/api/v1/auth";
    // this.app.use("/", healthRouter);
    // this.app.use(BASE_PATH, loginRegisterRouter);
    // this.app.use(BASE_PATH, verficationRouter);
    // this.app.use(BASE_PATH, passwordRouter);
    // this.app.use(BASE_PATH, identityRouter);
    // this.app.use(BASE_PATH, seedRouter);
  }

  private async start_rabbitmq() {
    // await mqWrapper.connect(config.RABBITMQ_ENDPOINT);
    // process.once("SIGINT", async () => {
    //   await mqWrapper.channel.close();
    //   await mqWrapper.connection.close();
    // });
  }

  private set_error_middlewares() {
    // this.app.use("*", () => {
    //   throw new NotFoundError();
    // });

    this.app.use("*", function (req, res, next) {
      next(new NotFoundError());
    });

    this.app.use(errorHandler);
  }

  private start_server() {
    const PORT = 4002;
    this.app.listen(PORT, () => {
      console.log(`Auth server is running on port ${PORT}`);
    });
  }
}

// ** Application

const app = express();

const server = new AuthService(app);

server.start();

// // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// // ** Configure Cloudinary
// configureCloudinary({
//   cloud_name: config.CLOUD_NAME,
//   api_key: config.CLOUD_API_KEY,
//   api_secret: config.CLOUD_API_SECRET,
// });

// // ** Create Express Application
// const app = express();

// // ** Body Parser Middleware (to parse JSON request bodies)
// // Hono parses JSON by default, Express needs explicit middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true })); // For URL-encoded bodies

// // ** Security Middlewares (CORS)
// app.use(
//   cors({
//     origin: "*", // Matches 'origin' from Hono's cors config
//     credentials: true, // Matches 'credentials'
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   })
// );

// app.use(verifyGatewayToken(config.GATEWAY_JWT_TOKEN, "auth"));

// // ** Route Middleware

// app.use(morgan("dev"));

// const BASE_PATH = "/api/v1/auth";

// app.use("/", healthRouter);
// app.use(BASE_PATH, loginRegisterRouter);
// app.use(BASE_PATH, verficationRouter);
// app.use(BASE_PATH, passwordRouter);
// app.use(BASE_PATH, identityRouter);
// app.use(BASE_PATH, seedRouter);

// // ** RabbitMQ Connection (This part remains largely the same as it's not framework-specific)
// (async () => {
//   try {
//     await mqWrapper.connect(config.RABBITMQ_ENDPOINT);
//     console.log("RabbitMQ connected successfully.");
//   } catch (error) {
//     console.error("Failed to connect to RabbitMQ:", error);
//     // Optionally, exit the process or handle the error appropriately
//     process.exit(1);
//   }
// })();

// // Graceful shutdown for RabbitMQ connection
// process.once("SIGINT", async () => {
//   try {
//     if (mqWrapper.channel) {
//       await mqWrapper.channel.close();
//       console.log("RabbitMQ channel closed.");
//     }
//     if (mqWrapper.connection) {
//       await mqWrapper.connection.close();
//       console.log("RabbitMQ connection closed.");
//     }
//     process.exit(0);
//   } catch (err) {
//     console.error("Error closing RabbitMQ connection:", err);
//     process.exit(1);
//   }
// });

// // ** 404 Not Found Handler
// app.get("*", () => {
//   throw new NotFoundError();
// });

// // ** Global Error Handling Middleware
// app.use(errorHandler);

// // ** Listen App

// const PORT = 4002;

// app.listen(PORT, () => {
//   console.log(`Gateway server is running on port ${PORT}`);
// });

// export default app;

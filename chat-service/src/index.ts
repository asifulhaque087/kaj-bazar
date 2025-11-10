// ** Third Party Imports
import express, { type Application, type Request } from "express";
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
import conversationRouter from "@src/routes/conversation.routes";
import messageRouter from "@src/routes/message.routes";
import { Server } from "socket.io";
import { ChatSeedRequestedListener } from "@src/events/listeners/chat-seed-requested.listener";

// Extend Req with IO
declare global {
  namespace Express {
    interface Request {
      io?: Server; // Add the 'io' property
    }
  }
}

// ** Define Service
class Service {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public async start() {
    this.load_configurations();
    this.set_standard_middlewares();
    this.set_security_middlewares();
    this.start_server();
    this.set_route_middlewares();
    await this.start_rabbitmq();
    this.set_error_middlewares();
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
    this.app.set("trust proxy", 1);
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

    new ChatSeedRequestedListener(mqWrapper.channel).listen();
  }

  private set_error_middlewares() {
    this.app.use("*", function (req, res, next) {
      next(new NotFoundError());
    });

    this.app.use(errorHandler);
  }

  // private start_server() {
  //   const PORT = 4005;

  //   this.app.listen(PORT, () => {
  //     console.log(`Chats server is running on port ${PORT}`);
  //   });

  //   initializeGatewayClient();
  // }

  private async start_server() {
    // create express app
    // create http server
    // start http server
    // create io using http server
    // create pub sub using io
    // create a new instance of socket using io

    const PORT = 4005;

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
    // const pubClient = createClient({ url: config.REDIS_HOST });
    // const subClient = pubClient.duplicate();
    // await Promise.all([pubClient.connect(), subClient.connect()]);
    // io.adapter(createAdapter(pubClient, subClient));

    // const socketIoApp = new SocketIOAppHandler(io);
    // socketIoApp.listen();

    // Attach io to the req
    this.app.use("*", function (req, res, next) {
      req.io = io; // Attach the initialized io instance
      next();
    });
  }
}

// ** Create & Start Application

const app = express();

const server = new Service(app);

await server.start();

// // ** Third Party Imports
// import express, {
//   type Application,
//   type NextFunction,
//   type Request,
//   type Response,
// } from "express"; // Import Request, Response, NextFunction
// import "express-async-errors";
// import cors from "cors";
// import morgan from "morgan";
// import {
//   configureCloudinary,
//   errorHandler,
//   NotFoundError,
//   verifyGatewayToken,
// } from "@fvoid/shared-lib";
// import http from "http";

// // ** Local Imports
// import { config } from "@src/config";
// import { mqWrapper } from "@src/rabbitmq-wrapper";
// import healthRouter from "@src/routes/health.routes";
// import queryRouter from "@src/routes/query.routes";
// import mutationRouter from "@src/routes/mutation.routes";
// import conversationRouter from "@src/routes/conversation.routes";
// import messageRouter from "@src/routes/message.routes";
// import { initializeGatewayClient } from "@src/sockets/gatewayClient";
// import { Server } from "socket.io";
// import { createClient } from "redis";
// import { createAdapter } from "@socket.io/redis-adapter";
// import { SocketIOAppHandler } from "@src/sockets/socket";

// // Extend Express's Request type for TypeScript support
// declare global {
//   namespace Express {
//     interface Request {
//       io?: Server; // Add the 'io' property
//     }
//   }
// }

// // ** Define Service

// class Service {
//   private app: Application;
//   private io!: Server; // Declare io property, will be initialized in start_server

//   constructor(app: Application) {
//     this.app = app;
//   }

//   public async start() {
//     // Make start async to await start_server
//     this.load_configurations();
//     this.set_standard_middlewares();
//     this.set_security_middlewares();

//     // Initialize Socket.IO and attach it *before* setting route middlewares
//     await this.start_server_and_socket_io();
//     this.set_socket_io_middleware(); // New middleware

//     this.set_route_middlewares();
//     // this.start_rabbitmq();
//     this.set_error_middlewares();
//   }

//   private load_configurations() {
//     configureCloudinary({
//       cloud_name: config.CLOUD_NAME,
//       api_key: config.CLOUD_API_KEY,
//       api_secret: config.CLOUD_API_SECRET,
//     });
//   }

//   private set_standard_middlewares() {
//     this.app.use(express.json({ limit: "50mb" }));
//     this.app.use(express.urlencoded({ limit: "50mb", extended: true })); // For URL-encoded bodies
//   }

//   private set_security_middlewares() {
//     this.app.use(
//       cors({
//         origin: "*",
//         credentials: true,
//         methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//       })
//     );

//     this.app.use(verifyGatewayToken(config.GATEWAY_JWT_TOKEN, "chats"));
//   }

//   // New Middleware to attach io to req
//   private set_socket_io_middleware() {
//     this.app.use((req: Request, res: Response, next: NextFunction) => {
//       req.io = this.io; // Attach the initialized io instance
//       next();
//     });
//   }

//   private set_route_middlewares() {
//     this.app.use(morgan("dev"));
//     const BASE_PATH = "/api/v1/chats";
//     this.app.use(healthRouter);
//     this.app.use(BASE_PATH, conversationRouter);
//     this.app.use(BASE_PATH, messageRouter);
//     // this.app.use(BASE_PATH, queryRouter);
//     // this.app.use(BASE_PATH, mutationRouter);
//   }

//   private async start_rabbitmq() {
//     await mqWrapper.connect(config.RABBITMQ_ENDPOINT);
//     process.once("SIGINT", async () => {
//       await mqWrapper.channel.close();
//       await mqWrapper.connection.close();
//     });
//   }

//   private set_error_middlewares() {
//     this.app.use("*", function (req, res, next) {
//       next(new NotFoundError());
//     });

//     this.app.use(errorHandler);
//   }

//   private async start_server_and_socket_io() {
//     const PORT = 4005;

//     const httpServer = new http.Server(this.app);

//     httpServer.listen(PORT, () => {
//       console.log(`Chats server running on port ${PORT}`);
//     });

//     this.io = new Server(httpServer, {
//       // Assign to this.io
//       cors: {
//         origin: "*",
//         methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//       },
//     });

//     // Uncomment and configure Redis adapter if you're using it for scaling
//     // const pubClient = createClient({ url: config.REDIS_HOST });
//     // const subClient = pubClient.duplicate();
//     // await Promise.all([pubClient.connect(), subClient.connect()]);
//     // this.io.adapter(createAdapter(pubClient, subClient));

//     const socketIoApp = new SocketIOAppHandler(this.io); // Pass this.io
//     socketIoApp.listen();
//   }
// }

// // ** Create & Start Application

// const app = express();

// const server = new Service(app);

// server.start();

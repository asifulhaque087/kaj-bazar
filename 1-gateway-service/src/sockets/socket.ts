// import { GatewayCache } from "@src/redis/gateway.cache";
// import { Server, Socket, type DisconnectReason } from "socket.io";

// export class SocketIOAppHandler {
//   private io: Server;
//   private gatewayCache: GatewayCache;
//   private userSocketIdMap: Map<string, string>;

//   constructor(io: Server) {
//     this.io = io;
//     this.gatewayCache = new GatewayCache();
//     this.userSocketIdMap = new Map<string, string>();
//   }

//   public listen(): void {
//     this.io.on("connection", async (socket: Socket) => {
//       // console.log("socket connected");

//       // const userId = socket.handshake.query.userId;

//       // console.log("###$##$#$#$ userId @#@$# ", userId);

//       // if (userId) this.userSocketIdMap[userId] = socket.id;

//       socket.on("registerUserSocket", async (username: string) => {
//         // console.log("user name is @#@@#@@@@@@@@@", username);
//         this.userSocketIdMap.set(username, socket.id);
//       });

//       socket.on("disconnect", async (reason: DisconnectReason) => {
//         for (const [username, socketId] of this.userSocketIdMap.entries()) {
//           if (socketId === socket.id) {
//             this.userSocketIdMap.delete(username);
//             break;
//           }
//         }
//       });

//       socket.on("getLoggedInUsers", async () => {
//         const response: string[] =
//           await this.gatewayCache.getLoggedInUsersFromCache("loggedInUsers");
//         this.io.emit("online", response);
//       });

//       socket.on("loggedInUsers", async (username: string) => {
//         const response: string[] =
//           await this.gatewayCache.saveLoggedInUserToCache(
//             "loggedInUsers",
//             username
//           );
//         this.io.emit("online", response);
//       });

//       socket.on("removeLoggedInUser", async (username: string) => {
//         const response: string[] =
//           await this.gatewayCache.removeLoggedInUserFromCache(
//             "loggedInUsers",
//             username
//           );
//         this.io.emit("online", response);
//       });

//       socket.on("category", async (category: string, username: string) => {
//         await this.gatewayCache.saveUserSelectedCategory(
//           `selectedCategories:${username}`,
//           category
//         );
//       });

//       socket.on("chatServiceNotification", (message) => {
//         console.log("!!!!!!!!!!!!!!!!!! message is ", message);

//         const receiverGatewaySocketId = this.userSocketIdMap.get(
//           message.receiverUsername
//         );

//         if (receiverGatewaySocketId) {
//           this.io.to(receiverGatewaySocketId).emit("newMessage", message);
//         }
//       });

//       socket.on("orderServiceNotification", (order, notification) => {
//         if (order.buyerUsername) {
//           const buyerGatewaySocketId = this.userSocketIdMap.get(
//             order.buyerUsername
//           );
//           if (buyerGatewaySocketId) {
//             this.io
//               .to(buyerGatewaySocketId)
//               .emit("order notification", order, notification);
//           }
//         } else {
//           this.io.emit("order notification", order, notification);
//         }
//       });
//     });
//   }
// }

import { config } from "@src/config";
import { GatewayCache } from "@src/redis/gateway.cache";
import { Server, Socket } from "socket.io";
import { io, Socket as SocketClient } from "socket.io-client";

// let chatSocketClient: SocketClient;
let orderSocketClient: SocketClient;

export class SocketIOAppHandler {
  private io: Server;
  private gatewayCache: GatewayCache;
  private userSocketIdMap: Map<string, string>;

  constructor(io: Server) {
    this.io = io;
    this.gatewayCache = new GatewayCache();
    this.userSocketIdMap = new Map<string, string>();
    this.chatSocketServiceIOConnections();
    // this.orderSocketServiceIOConnections();
  }

  public listen(): void {
    this.io.on("connection", async (socket: Socket) => {
      socket.on("registerUserSocket", async (username: string) => {
        this.userSocketIdMap.set(username, socket.id);
      });

      // socket.on("getLoggedInUsers", async () => {
      //   const response: string[] =
      //     await this.gatewayCache.getLoggedInUsersFromCache("loggedInUsers");
      //   this.io.emit("online", response);
      // });

      // socket.on("loggedInUsers", async (username: string) => {
      //   const response: string[] =
      //     await this.gatewayCache.saveLoggedInUserToCache(
      //       "loggedInUsers",
      //       username
      //     );
      //   this.io.emit("online", response);
      // });

      // socket.on("removeLoggedInUser", async (username: string) => {
      //   const response: string[] =
      //     await this.gatewayCache.removeLoggedInUserFromCache(
      //       "loggedInUsers",
      //       username
      //     );
      //   this.io.emit("online", response);
      // });

      // socket.on("category", async (category: string, username: string) => {
      //   await this.gatewayCache.saveUserSelectedCategory(
      //     `selectedCategories:${username}`,
      //     category
      //   );
      // });
    });
  }

  private chatSocketServiceIOConnections(): void {
    const chatSocketClient = io(`${config.CHAT_BASE_URL}`, {
      transports: ["websocket", "polling"],
      secure: true,
    });

    chatSocketClient.on("connect", () => {
      console.log("ChatService socket connected");
    });

    chatSocketClient.on(
      "disconnect",
      (reason: SocketClient.DisconnectReason) => {
        console.log("error", "ChatSocket disconnect reason:", reason);
        chatSocketClient.connect();
      }
    );

    // chatSocketClient.on('connect_error', (error: Error) => {
    //   console.log('error', 'ChatService socket connection error:', error);
    //   chatSocketClient.connect();
    // });

    chatSocketClient.on("connect_error", () => {
      console.log("error", "ChatService socket connection error:");
      chatSocketClient.connect();
    });

    // custom events
    chatSocketClient.on("newMessage", (message) => {
      console.log("!!!!!!!!!!!!!!!!!! message is ", message);

      const receiverGatewaySocketId = this.userSocketIdMap.get(
        message.receiverUsername
      );

      if (receiverGatewaySocketId) {
        this.io.to(receiverGatewaySocketId).emit("newMessage", message);
      }
    });

    // chatSocketClient.on("message updated", (data: IMessageDocument) => {
    //   this.io.emit("message updated", data);
    // });
  }

  // private orderSocketServiceIOConnections(): void {
  //   orderSocketClient = io(`${config.ORDER_BASE_URL}`, {
  //     transports: ["websocket", "polling"],
  //     secure: true,
  //   });

  //   orderSocketClient.on("connect", () => {
  //     console.log("OrderService socket connected");
  //   });

  //   orderSocketClient.on(
  //     "disconnect",
  //     (reason: SocketClient.DisconnectReason) => {
  //       console.log("error", "OrderSocket disconnect reason:", reason);
  //       orderSocketClient.connect();
  //     }
  //   );

  //   // orderSocketClient.on('connect_error', (error: Error) => {
  //   //   console.log('error', 'OrderService socket connection error:', error);
  //   //   orderSocketClient.connect();
  //   // });

  //   orderSocketClient.on("connect_error", () => {
  //     console.log("error", "OrderService socket connection error:");
  //     orderSocketClient.connect();
  //   });

  //   // custom event
  //   orderSocketClient.on(
  //     "order notification",
  //     (order: IOrderDocument, notification: IOrderNotifcation) => {
  //       this.io.emit("order notification", order, notification);
  //     }
  //   );
  // }
}

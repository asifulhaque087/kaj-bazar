import { GatewayCache } from "@src/redis/gateway.cache";
import { Server, Socket, type DisconnectReason } from "socket.io";

export class SocketIOAppHandler {
  private io: Server;
  private gatewayCache: GatewayCache;
  private userSocketIdMap: Map<string, string>;

  constructor(io: Server) {
    this.io = io;
    this.gatewayCache = new GatewayCache();
    this.userSocketIdMap = new Map<string, string>();
  }

  public listen(): void {
    this.io.on("connection", async (socket: Socket) => {
      socket.on("registerUserSocket", async (username: string) => {
        this.userSocketIdMap.set(username, socket.id);
      });

      socket.on("disconnect", async (reason: DisconnectReason) => {
        for (const [username, socketId] of this.userSocketIdMap.entries()) {
          if (socketId === socket.id) {
            this.userSocketIdMap.delete(username);
            break;
          }
        }
      });

      socket.on("getLoggedInUsers", async () => {
        const response: string[] =
          await this.gatewayCache.getLoggedInUsersFromCache("loggedInUsers");
        this.io.emit("online", response);
      });

      socket.on("loggedInUsers", async (username: string) => {
        const response: string[] =
          await this.gatewayCache.saveLoggedInUserToCache(
            "loggedInUsers",
            username
          );
        this.io.emit("online", response);
      });

      socket.on("removeLoggedInUser", async (username: string) => {
        const response: string[] =
          await this.gatewayCache.removeLoggedInUserFromCache(
            "loggedInUsers",
            username
          );
        this.io.emit("online", response);
      });

      socket.on("category", async (category: string, username: string) => {
        await this.gatewayCache.saveUserSelectedCategory(
          `selectedCategories:${username}`,
          category
        );
      });

      socket.on("chat message received", (message) => {
        const receiverGatewaySocketId = this.userSocketIdMap.get(
          message.receiverUsername
        );

        if (receiverGatewaySocketId) {
          this.io.to(receiverGatewaySocketId).emit("message received", message);
        }
      });

      socket.on("orderServiceNotification", (order, notification) => {
        if (order.buyerUsername) {
          const buyerGatewaySocketId = this.userSocketIdMap.get(
            order.buyerUsername
          );
          if (buyerGatewaySocketId) {
            this.io
              .to(buyerGatewaySocketId)
              .emit("order notification", order, notification);
          }
        } else {
          this.io.emit("order notification", order, notification);
        }
      });
    });
  }
}

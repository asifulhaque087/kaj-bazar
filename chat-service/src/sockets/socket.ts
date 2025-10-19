// @src/sockets/socket.ts
import { Server, Socket, type DisconnectReason } from "socket.io";

export class SocketIOAppHandler {
  private io: Server;
  private userSocketIdMap: Map<string, string>;

  constructor(io: Server) {
    this.io = io;
    this.userSocketIdMap = new Map<string, string>();
  }

  public listen(): void {
    this.io.on("connection", async (socket: Socket) => {
      console.log(`Socket connected: ${socket.id}`);

      // Example: Store user socket ID if you have authentication
      // socket.on('authenticate', (userId: string) => {
      //   this.userSocketIdMap.set(userId, socket.id);
      //   console.log(`User ${userId} authenticated with socket ${socket.id}`);
      // });

      socket.on("disconnect", (reason: DisconnectReason) => {
        console.log(`Socket disconnected: ${socket.id} due to ${reason}`);
        // Example: Remove user from map on disconnect
        // this.userSocketIdMap.forEach((value, key) => {
        //   if (value === socket.id) {
        //     this.userSocketIdMap.delete(key);
        //     console.log(`Removed user ${key} from map.`);
        //   }
        // });
      });

      // Add other Socket.IO event listeners here
      // For example:
      // socket.on("join_room", (roomName: string) => {
      //   socket.join(roomName);
      //   console.log(`Socket ${socket.id} joined room ${roomName}`);
      // });

      // socket.on("send_message", (data: { room: string, message: string }) => {
      //   this.io.to(data.room).emit("receive_message", data.message);
      // });
    });
  }
}

// src/socket/gatewayClient.ts

import { io, Socket as SocketClient } from "socket.io-client";
import { config } from "@src/config"; // Make sure this path is correct for your Chat Service's config

// Export the gatewayClient instance so other modules can import and use it
export let gatewayClient: SocketClient;

export const initializeGatewayClient = (): void => {
  // Connect to the Gateway's Socket.IO server
  gatewayClient = io(`${config.API_GATEWAY_URL}`, {
    transports: ["websocket", "polling"], // Standard transports
    secure: true, // Use true if your Gateway uses HTTPS/WSS, false for HTTP/WS
  });

  gatewayClient.on("connect", () => {
    console.log("Chat Service connected as client to Gateway socket server.");
    // Optional: Emit a service identification event if the Gateway needs to distinguish
    // between frontend clients and backend service clients for specific logic.
    // gatewayClient.emit('registerService', 'chat-service');
  });

  gatewayClient.on("disconnect", (reason: SocketClient.DisconnectReason) => {
    console.error("Chat Service client to Gateway disconnected:", reason);
    // Implement a reconnection strategy if desired
    gatewayClient.connect();
  });

  gatewayClient.on("connect_error", (error: Error) => {
    console.error("Chat Service client to Gateway connection error:", error);
    // Implement a reconnection strategy
    gatewayClient.connect();
  });
};

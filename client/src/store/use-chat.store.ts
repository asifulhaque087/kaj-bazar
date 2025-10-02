import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import { Conversation, Message } from "@/schemas";
import { useAuthStore } from "@/store/use-auth.store";
import { config } from "@/config";

export interface ChatUser {
  name: string;
  profilePhoto: string;
}

type States = {
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  messages: Message[];
  socket: Socket | null;
  messageSenderUser: ChatUser | null;
  messageReceiverUser: ChatUser | null;
};

type Actions = {
  setSelectedConversation: (conversation: Conversation) => void;
  setMessageSenderUser: (user: ChatUser) => void;
  setMessageReceiverUser: (user: ChatUser) => void;
  setMessages: (messages: Message[]) => void;
  connectSocket: () => void;
  disconnectSocket: () => void;
  subscribeToMessages: () => void;
  unsubscribeFromMessages: () => void;
};

// login, register, auth check er pore socket connect  korte hobe.

export const useChatStore = create<States & Actions>((set, get) => ({
  conversations: [],
  selectedConversation: null,
  messages: [],
  messageSenderUser: null,
  messageReceiverUser: null,
  socket: null,
  setMessageReceiverUser: (user) =>
    set({
      messageReceiverUser: user,
    }),

  setMessageSenderUser: (user) =>
    set({
      messageSenderUser: user,
    }),

  setSelectedConversation: (conversation) =>
    set({ selectedConversation: conversation }),

  setMessages: (messages) => {
    set({ messages: messages });
  },

  connectSocket: () => {
    const authUser = useAuthStore.getState().authUser;

    if (!authUser || get().socket?.connected) return;

    // gatewayClient = io(`${config.API_GATEWAY_URL}`, {
    //   transports: ["websocket", "polling"], // Standard transports
    //   secure: true, // Use true if your Gateway uses HTTPS/WSS, false for HTTP/WS
    // });

    const socket = io("http://localhost:4000/", {
      transports: ["websocket", "polling"],
      secure: true,
      query: {
        userId: authUser.id,
      },
    });
    // socket.connect();
    // socket.connect;

    set({ socket: socket });

    socket.on("connect", () => {
      console.log("Client connected to Gateway socket server.");
      socket.emit("registerUserSocket", authUser.username);
      get().subscribeToMessages();
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected from Gateway socket server.");
      get().unsubscribeFromMessages(); // Unsubscribe on disconnect
    });

    // socket.on("getOnlineUsers", (userIds) => {
    //   set({ onlineUsers: userIds });
    // });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) {
      get().unsubscribeFromMessages(); // Unsubscribe before disconnecting
      get().socket?.disconnect();
    }
    set({ socket: null }); // Clear socket reference
  },
  subscribeToMessages: () => {
    const socket = get().socket;

    socket?.on("newMessage", (newMessage) => {
      set({
        messages: [...get().messages, newMessage],
      });
    });

    socket?.on("updateMessage", (upMsg) => {
      const updateMessages = get().messages.map((msg) =>
        msg.id === upMsg.id ? upMsg : msg
      );
      set({ messages: updateMessages });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = get().socket;
    socket?.off("newMessage");
  },
}));

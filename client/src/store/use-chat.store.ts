import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import { useAuthStore } from "@/store/use-auth.store";
import { config } from "@/config";
import { Conversation, Message } from "@/features/chat/schemas/chat.schema";
import { Order } from "@/features/order/schemas/order.schema";

export interface ChatUser {
  name: string;
  profilePhoto: string;
}

type NotificationType = "start order" | "extend order";

export interface Notification {
  // title: string;
  order: Order;
  type: NotificationType;
}

type States = {
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  messages: Message[];
  socket: Socket | null;
  messageSenderUser: ChatUser | null;
  messageReceiverUser: ChatUser | null;
  unreadMessages: Message[];
  notifications: Notification[];
};

type Actions = {
  setSelectedConversation: (conversation: Conversation | null) => void;
  setUnreadMessages: (messages: Message[]) => void;
  setMessageSenderUser: (user: ChatUser) => void;
  setMessageReceiverUser: (user: ChatUser) => void;
  setMessages: (messages: Message[]) => void;
  connectSocket: () => void;
  disConnectSocket: () => void;
  subscribeToMessages: () => void;
  subscribeToNotifications: () => void;
  unsubscribeFromMessages: () => void;
  setNotificationEmpty: () => void;
  resetChatStore: () => void;
};

const initialStates: States = {
  conversations: [],
  selectedConversation: null,
  messages: [],
  unreadMessages: [],
  messageSenderUser: null,
  messageReceiverUser: null,
  socket: null,
  notifications: [],
};

// login, register, auth check er pore socket connect  korte hobe.

export const useChatStore = create<States & Actions>((set, get) => ({
  ...initialStates,

  setNotificationEmpty: () => {
    set({
      notifications: [],
    });
  },

  setUnreadMessages: (messages) => {
    set({
      unreadMessages: messages,
    });
  },
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

    const socket = io(config.SOCKET_GATEWAY_URL, {
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
      get().subscribeToNotifications();
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected from Gateway socket server.");
      get().unsubscribeFromMessages(); // Unsubscribe on disconnect
    });

    // socket.on("getOnlineUsers", (userIds) => {
    //   set({ onlineUsers: userIds });
    // });
  },
  disConnectSocket: () => {
    if (get().socket?.connected) {
      get().unsubscribeFromMessages(); // Unsubscribe before disconnecting
      get().socket?.disconnect();
    }
    set({ socket: null }); // Clear socket reference
  },
  subscribeToMessages: () => {
    const authUser = useAuthStore.getState().authUser;

    const socket = get().socket;

    socket?.on("newMessage", (newMessage: Message) => {
      set({
        messages: [...get().messages, newMessage],
      });

      if (
        get().selectedConversation?.id !== newMessage.conversationId &&
        newMessage.receiverUsername === authUser?.username
      ) {
        set({
          unreadMessages: [...get().unreadMessages, newMessage],
        });
      }
    });

    socket?.on("updateMessage", (upMsg) => {
      const updateMessages = get().messages.map((msg) =>
        msg.id === upMsg.id ? upMsg : msg
      );
      set({ messages: updateMessages });
    });
  },

  subscribeToNotifications: () => {
    const socket = get().socket;

    socket?.on(
      "order notification",
      (notificationType: NotificationType, order: Order) => {
        // prepare notification data
        const newNotification: Notification = {
          type: notificationType,
          order: order,
        };

        set({
          notifications: [...get().notifications, newNotification],
        });
      }
    );
  },

  unsubscribeFromMessages: () => {
    const socket = get().socket;
    socket?.off("newMessage");
  },

  resetChatStore: () => set(initialStates),
}));

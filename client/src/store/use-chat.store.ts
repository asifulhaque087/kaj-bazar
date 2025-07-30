import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import { Conversation, Message } from "@/schemas";

type States = {
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  messages: Message[];
  IO: Socket | null;
};

type Actions = {
  setSelectedConversation: (conversation: Conversation) => void;
  setMessages: (messages: Message[]) => void;
  connectSocket: () => void;
  disconnectSocket: () => void;
  subscribeToMessages: () => void;
  unsubscribeFromMessages: () => void;
  // setAuthUser: (user: Auth) => void;
  // setBuyer: (buyer: Buyer) => void;
};

// login, register, auth check er pore connect socket korte hobe.

export const useChatStore = create<States & Actions>((set, get) => ({
  conversations: [],
  selectedConversation: null,
  messages: [],
  IO: null,

  setSelectedConversation: (conversation) =>
    set({ selectedConversation: conversation }),

  setMessages: (messages) => {
    set({ messages: messages });
  },

  connectSocket: () => {
    const { authUser } = get();

    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
}));

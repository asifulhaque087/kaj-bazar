import { Auth } from "@/schemas";

export interface UseGetConversationsByUsernameProps {
  authUser: Auth | null;
}

export interface UseGetConversationsByIdProps {
  conversationId: string;
}

export interface UseGetMessageByIdProps {
  id: string;
}

import { Auth } from "@/schemas";

export interface UseGetConversationsByUsernameProps {
  authUser: Auth | null;
}

export interface UseGetConversationsByIdProps {
  conversationId: string;
}

import { getConversationsByUsername } from "@/features/chats/api/queries.api";
import { Auth } from "@/schemas";
import { useQuery } from "@tanstack/react-query";

export interface UseGetConversationsByUsernameProps {
  authUser: Auth | null;
}

export const useGetConversationsByUsername = (
  props: UseGetConversationsByUsernameProps
) => {
  const { authUser } = props;

  return useQuery({
    queryKey: ["conversations", authUser?.username],
    queryFn: () => getConversationsByUsername(authUser?.username!),
    enabled: !!authUser?.username,
  });
};

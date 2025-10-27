import { getConversationsByUsername } from "@/features/chat/api/queries.api";
import { Auth } from "@/features/shared";
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

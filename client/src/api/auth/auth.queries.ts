import { getAuthUser } from "@/api/auth/auth.service";
import { useQueryWithSideEffects } from "@/hooks/useQueryWithSideEffects";
import { useAuthStore } from "@/store/use-auth.store";
import { useChatStore } from "@/store/use-chat.store";
// import { useQuery } from "@tanstack/react-query";

export const useAuthUser = () => {
  // ** --- store ---
  const { connectSocket } = useChatStore();
  const { setAuthUser } = useAuthStore();

  return useQueryWithSideEffects({
    queryKey: ["auth_user"],
    queryFn: () => getAuthUser(),
    staleTime: Infinity,
    gcTime: Infinity,
    retry: false,

    onSuccess: (data) => {
      setAuthUser(data);
      connectSocket();
    },
  });
};

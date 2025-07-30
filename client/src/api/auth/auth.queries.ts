import { getAuthUser } from "@/api/auth/auth.service";
import { useQuery } from "@tanstack/react-query";

export const useAuthUser = () => {
  return useQuery({
    queryKey: ["auth_user"],
    queryFn: () => getAuthUser(),
    staleTime: Infinity,
    gcTime: Infinity,
    retry: false,
  });
};

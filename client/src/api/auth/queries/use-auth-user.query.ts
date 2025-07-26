import { Auth } from "@/api/auth/schemas/auth.schema";
import { auth__axios } from "@/api/common/axios.service";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useAuthUser = () => {
  return useQuery({
    queryKey: ["auth_user"],
    queryFn: () => hitApi(),
    staleTime: 20000,
    placeholderData: keepPreviousData,
  });

  //   **  --- Api ---
  async function hitApi(): Promise<Auth> {
    const response = await auth__axios.get<Auth>(`/currentuser`);
    return response.data;
  }
};

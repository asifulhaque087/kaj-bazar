import { currentBuyer } from "@/api/buyers/buyer.service";
import { useQuery } from "@tanstack/react-query";

export const useCurrentBuyer = (authId: string | undefined) => {
  return useQuery({
    queryKey: ["current_buyer"],
    queryFn: () => currentBuyer(),
    // staleTime: 20000,
    // staleTime: 5 * 60 * 1000,
    enabled: !!authId,
  });
};

import { currentBuyer } from "@/api/buyers/queries/current-buyer/curren-buyer.api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useCurrentBuyer = () => {
  return useQuery({
    queryKey: ["current_buyer"],
    queryFn: () => currentBuyer(),
    staleTime: 20000,
    placeholderData: keepPreviousData,
  });
};

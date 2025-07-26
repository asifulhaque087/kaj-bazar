import { getGigById } from "@/api/gigs/queries/queries.apis";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetGigById = ({ id }: { id: number }) => {
  return useQuery({
    queryKey: ["gig", id],
    queryFn: () => getGigById(id),
    staleTime: 20000,
    placeholderData: keepPreviousData,
  });
};

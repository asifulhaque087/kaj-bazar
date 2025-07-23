import { searchGigs } from "@/api/gigs/queries/queries.apis";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useSearch = ({ q }: { q: string }) => {
  return useQuery({
    queryKey: ["gigs", q],
    queryFn: () => searchGigs(q),
    staleTime: 20000,
    placeholderData: keepPreviousData,
  });
};

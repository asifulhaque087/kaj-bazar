// import { searchGigs } from "@/api/gigs/queries/queries.apis";
// import { keepPreviousData, useQuery } from "@tanstack/react-query";

// export const useSearch = ({ q }: { q: string }) => {
//   return useQuery({
//     queryKey: ["gigs", q],
//     queryFn: () => searchGigs(q),
//     staleTime: 20000,
//     placeholderData: keepPreviousData,
//   });
// };

import { searchGigs } from "@/api/gigs/queries/queries.apis";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useSearch = ({
  q,
  page,
  limit,
}: {
  q: string;
  page: number;
  limit: number;
}) => {
  return useQuery({
    queryKey: ["gigs", q, page, limit], // Include page and limit in queryKey
    queryFn: () => searchGigs(q, page, limit), // Pass page and limit to searchGigs
    staleTime: 20000,
    placeholderData: keepPreviousData,
    // Add refetchOnWindowFocus: false if you don't want to refetch on window focus
    // refetchOnWindowFocus: false,
  });
};

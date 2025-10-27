import { searchGigs } from "@/features/gig/api/queries.api";
import { useQuery } from "@tanstack/react-query";

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
    refetchOnWindowFocus: false, // ⬅️ Add this line
  });
};

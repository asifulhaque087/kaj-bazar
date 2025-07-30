import { useQuery } from "@tanstack/react-query";
import { getGigById, searchGigs } from "@/api/gigs/gig.service";

export const useGetGigById = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ["gig", id],
    queryFn: () => getGigById(id),
  });
};

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
  });
};

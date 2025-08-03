import { useQuery } from "@tanstack/react-query";
import {
  getGigById,
  getGigBySellerId,
  searchGigs,
} from "@/api/gigs/gig.service";
import { useQueryWithSideEffects } from "@/hooks/useQueryWithSideEffects";

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

export const useGetGigBySellerId = (sellerId: string | undefined) => {
  return useQueryWithSideEffects({
    queryKey: ["gig", sellerId],
    queryFn: () => getGigBySellerId(sellerId!),
    enabled: !!sellerId,
  });
};

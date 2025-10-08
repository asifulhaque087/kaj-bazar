import { getGigBySellerId } from "@/features/gigs/api/queries.api";
import { useQueryWithSideEffects } from "@/hooks/useQueryWithSideEffects";

export const useGetGigBySellerId = (sellerId: string | undefined) => {
  return useQueryWithSideEffects({
    queryKey: ["gig", sellerId],
    queryFn: () => getGigBySellerId(sellerId!),
    enabled: !!sellerId,
    refetchOnWindowFocus: false, // ⬅️ Add this line
  });
};

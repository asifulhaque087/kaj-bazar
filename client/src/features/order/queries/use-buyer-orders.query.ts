import { GetBuyerOrders } from "@/features/order/api/queries.api";
import { useQueryWithSideEffects } from "@/hooks/useQueryWithSideEffects";

export const useBuyerOrders = (buyerId?: string) => {
  // ** --- Props ---
  return useQueryWithSideEffects({
    queryKey: ["buyer-orders", buyerId],
    queryFn: () => GetBuyerOrders(buyerId!),
    enabled: !!buyerId,
    staleTime: 5 * 60 * 1000, // e.g., 5 minutes.
    gcTime: 10 * 60 * 1000, // e.g., 10 minutes.
    // onSuccess: (data) => {},
  });
};

import { GetBuyerOrders } from "@/features/order/api/queries.api";
import { useQueryWithSideEffects } from "@/hooks/useQueryWithSideEffects";

export type OrderStatus =
  | "status=incomplete"
  | "status=progress"
  | "status=complete";

interface Props {
  buyerId?: string;
  q?: OrderStatus;
}

export const useBuyerOrdersQuery = (props: Props) => {
  const { buyerId, q } = props;

  // ** --- Props ---
  return useQueryWithSideEffects({
    queryKey: ["buyer-orders", buyerId, q],
    queryFn: () => GetBuyerOrders(buyerId!, q),
    enabled: !!buyerId,
    // staleTime: 5 * 60 * 1000, // e.g., 5 minutes.
    // gcTime: 10 * 60 * 1000, // e.g., 10 minutes.
    // onSuccess: (data) => {},
  });
};

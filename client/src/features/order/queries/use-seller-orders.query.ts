import { GetSellerOrders } from "@/features/order/api/queries.api";
import { useQueryWithSideEffects } from "@/hooks/useQueryWithSideEffects";

export type OrderStatus =
  | "status=incomplete"
  | "status=progress"
  | "status=complete";

interface Props {
  sellerId?: string;
  q?: OrderStatus;
}

export const useSellerOrdersQuery = (props: Props) => {
  const { sellerId, q } = props;

  // ** --- Props ---
  return useQueryWithSideEffects({
    queryKey: ["seller-orders", sellerId, q],
    queryFn: () => GetSellerOrders(sellerId!, q),
    enabled: !!sellerId,
    staleTime: 5 * 60 * 1000, // e.g., 5 minutes.
    gcTime: 10 * 60 * 1000, // e.g., 10 minutes.
    // onSuccess: (data) => {},
  });
};

import { GetBuyerOrders } from "@/features/order/api/queries.api";
import { useQueryWithSideEffects } from "@/hooks/useQueryWithSideEffects";
import { useAuthStore } from "@/store/use-auth.store";

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

  // ** --- store ---
  const { activeRole } = useAuthStore();

  console.log(" from inside buyer order query ", activeRole);

  // ** --- Props ---
  return useQueryWithSideEffects({
    queryKey: ["buyer-orders", buyerId, q],
    queryFn: () => GetBuyerOrders(buyerId!, q),
    // enabled: !!buyerId,
    enabled: !!buyerId && activeRole === "buyer",
    // staleTime: 5 * 60 * 1000, // e.g., 5 minutes.
    // gcTime: 10 * 60 * 1000, // e.g., 10 minutes.
    // onSuccess: (data) => {},
  });
};

import { getOrderById } from "@/features/order/api/queries.api";
import { useQueryWithSideEffects } from "@/hooks/useQueryWithSideEffects";

export const useGetOrderById = (orderId: string | null) => {
  // ** --- Props ---

  return useQueryWithSideEffects({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId!),
    enabled: !!orderId,
    onSuccess: (data) => {
      // setOtherSeller(data);
    },
  });
};

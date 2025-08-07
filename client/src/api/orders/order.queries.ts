import { getOrderById } from "@/api/orders/order.service";
import { useQueryWithSideEffects } from "@/hooks/useQueryWithSideEffects";

export const useGetOrderById = (orderId: string | null) => {
  // ** --- Props ---

  // console.log("order id is jll ", orderId);

  return useQueryWithSideEffects({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId!),
    enabled: !!orderId,
    onSuccess: (data) => {
      // setOtherSeller(data);
    },
  });
};

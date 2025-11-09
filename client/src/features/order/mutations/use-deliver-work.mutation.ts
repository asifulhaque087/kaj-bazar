import { deliverWork } from "@/features/order/api/mutations.api";
import { DeliveredWorkPayload } from "@/features/order/schemas/deliver-work.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeliverWork = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DeliveredWorkPayload) => deliverWork(data),

    onSuccess: (order) => {
      queryClient.invalidateQueries({ queryKey: ["order", order.id] });
    },
  });
};

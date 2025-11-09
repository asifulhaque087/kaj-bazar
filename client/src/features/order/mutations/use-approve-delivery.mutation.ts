import { approveDelivery } from "@/features/order/api/mutations.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useApproveDelivery = () => {
  // ** --- hooks ---
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => approveDelivery(id),

    onSuccess: (order) => {
      queryClient.invalidateQueries({ queryKey: ["order", order.id] });
    },
  });
};

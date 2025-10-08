import { startOrder } from "@/features/orders/api/mutations.api";
import { StartOrderPayload } from "@/features/orders/schemas/start-order.schema";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useStartOrder = () => {
  // ** hooks
  const router = useRouter();

  return useMutation({
    mutationFn: (data: StartOrderPayload) => startOrder(data),

    onSuccess: (order) => {
      router.push(`/order/${order.id}/activity`);
    },

    // onError: (error: AxiosError) => {},
  });
};

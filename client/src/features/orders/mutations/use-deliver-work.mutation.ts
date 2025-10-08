import { deliverWork } from "@/features/orders/api/mutations.api";
import { DeliveredWorkPayload } from "@/features/orders/schemas/deliver-work.schema";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useDeliverWork = () => {
  // ** hooks
  // const router = useRouter();

  return useMutation({
    mutationFn: (data: DeliveredWorkPayload) => deliverWork(data),

    onSuccess: (order) => {
      // router.push(`/order/${order.id}/activity`);
    },

    onError: (error: AxiosError) => {},
  });
};

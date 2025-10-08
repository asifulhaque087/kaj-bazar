import { approveDelivery } from "@/features/orders/api/mutations.api";
import { useMutation } from "@tanstack/react-query";

export const useApproveDelivery = () => {
  // ** hooks
  // const router = useRouter();

  return useMutation({
    mutationFn: (id: string) => approveDelivery(id),

    onSuccess: (order) => {
      // router.push(`/order/${order.id}/activity`);
    },

    // onError: (error: AxiosError) => {},
  });
};

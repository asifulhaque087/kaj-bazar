import { buyerReviewSeller } from "@/features/review/api/mutations.api";
import { BuyerReviewSellerPayload } from "@/features/review/schemas/review.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useBuyerReviewSeller = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BuyerReviewSellerPayload) => buyerReviewSeller(data),

    onSuccess: (review) => {
      queryClient.invalidateQueries({ queryKey: ["order", review.orderId] });
    },

    // onError: (error: AxiosError) => {},
  });
};

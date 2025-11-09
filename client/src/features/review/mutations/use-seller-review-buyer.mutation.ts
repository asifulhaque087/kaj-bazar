import { sellerReviewBuyer } from "@/features/review/api/mutations.api";
import { SellerReviewBuyerPayload } from "@/features/review/schemas/review.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSellerReviewBuyer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SellerReviewBuyerPayload) => sellerReviewBuyer(data),

    onSuccess: (review) => {
      queryClient.invalidateQueries({ queryKey: ["order", review.orderId] });
    },
  });
};

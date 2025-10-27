import { sellerReviewBuyer } from "@/features/review/api/mutations.api";
import { SellerReviewBuyerPayload } from "@/features/review/schemas/review.schema";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useSellerReviewBuyer = () => {
  return useMutation({
    mutationFn: (data: SellerReviewBuyerPayload) => sellerReviewBuyer(data),

    onSuccess: (review) => {
      // router.push(`/order/${order.id}/activity`);
    },

    onError: (error: AxiosError) => {},
  });
};

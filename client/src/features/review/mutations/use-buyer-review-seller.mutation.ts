import { buyerReviewSeller } from "@/features/review/api/mutations.api";
import { BuyerReviewSellerPayload } from "@/features/review/schemas/review.schema";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useBuyerReviewSeller = () => {
  return useMutation({
    mutationFn: (data: BuyerReviewSellerPayload) => buyerReviewSeller(data),

    onSuccess: (review) => {
      // router.push(`/order/${order.id}/activity`);
    },

    onError: (error: AxiosError) => {},
  });
};

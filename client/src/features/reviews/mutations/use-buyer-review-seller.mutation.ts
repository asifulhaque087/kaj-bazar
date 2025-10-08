import { buyerReviewSeller } from "@/features/reviews/api/mutations.api";
import { BuyerReviewSellerPayload } from "@/schemas";
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

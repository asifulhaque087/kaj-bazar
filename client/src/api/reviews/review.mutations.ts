import {
  buyerReviewSeller,
  sellerReviewBuyer,
} from "@/api/reviews/review.service";
import { BuyerReviewSellerPayload, SellerReviewBuyerPayload } from "@/schemas";
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

export const useSellerReviewBuyer = () => {
  return useMutation({
    mutationFn: (data: SellerReviewBuyerPayload) => sellerReviewBuyer(data),

    onSuccess: (review) => {
      // router.push(`/order/${order.id}/activity`);
    },

    onError: (error: AxiosError) => {},
  });
};

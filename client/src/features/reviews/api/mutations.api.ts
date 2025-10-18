import { review__axios } from "@/axios.service";
import {
  BuyerReviewSellerPayload,
  Review,
  SellerReviewBuyerPayload,
} from "@/schemas";

export const buyerReviewSeller = async (body: BuyerReviewSellerPayload) => {
  const response = await review__axios.post<Review>(
    `/buyer-review-seller`,
    body
  );
  return response.data;
};

export const sellerReviewBuyer = async (body: SellerReviewBuyerPayload) => {
  const response = await review__axios.post<Review>(
    `/seller-review-buyer`,
    body
  );
  return response.data;
};

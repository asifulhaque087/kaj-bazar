import { review__axios } from "@/axios.service";
import { Review } from "@/features/review/schemas/review.schema";

export const getGigReviews = async (gigId: string): Promise<Review[]> => {
  const response = await review__axios.get<Review[]>(`/gig/${gigId}`);
  return response.data;
};

export const getSellerReviews = async (sellerId: string): Promise<Review[]> => {
  const response = await review__axios.get<Review[]>(`/seller/${sellerId}`);
  return response.data;
};

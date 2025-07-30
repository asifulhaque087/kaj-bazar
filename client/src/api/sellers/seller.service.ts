import { seller__axios } from "@/api/common/axios.service";
import { CreateSellerPayload } from "@/schemas/seller.schema";

export const createSeller = async (data: CreateSellerPayload) => {
  const response = await seller__axios.post(`/create`, data);
  return response.data;
};

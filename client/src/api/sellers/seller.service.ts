import { seller__axios } from "@/api/common/axios.service";
import { CreateSellerPayload, Seller } from "@/schemas";

export const createSeller = async (data: CreateSellerPayload) => {
  const response = await seller__axios.post(`/create`, data);
  return response.data;
};

export const getSellerByName = async (username: string) => {
  const response = await seller__axios.get<Seller>(`/username/${username}`);
  return response.data;
};

import { seller__axios } from "@/axios.service";
import { Seller } from "@/schemas";

export const getSellerByName = async (username: string) => {
  const response = await seller__axios.get<Seller>(`/username/${username}`);
  return response.data;
};

export const getSellerById = async (sellerId: string) => {
  const response = await seller__axios.get<Seller>(`/${sellerId}`);
  return response.data;
};

export const getCurrentSeller = async () => {
  const response = await seller__axios.get<Seller>(`/current-seller`);
  return response.data;
};

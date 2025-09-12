import { seller__axios } from "@/api/common/axios.service";
import { CreateSellerPayload, Seller, UpdateSellerPayload } from "@/schemas";

export const createSeller = async (data: CreateSellerPayload) => {
  const response = await seller__axios.post(`/create`, data);
  return response.data;
};

export const updateSeller = async (data: UpdateSellerPayload) => {
  const response = await seller__axios.put(`/update`, data);
  return response.data;
};

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

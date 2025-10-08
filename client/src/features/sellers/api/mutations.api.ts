import { seller__axios } from "@/api/common/axios.service";
import { CreateSellerPayload, UpdateSellerPayload } from "@/schemas";

export const createSeller = async (data: CreateSellerPayload) => {
  const response = await seller__axios.post(`/create`, data);
  return response.data;
};

export const updateSeller = async (data: UpdateSellerPayload) => {
  const response = await seller__axios.put(`/update`, data);
  return response.data;
};

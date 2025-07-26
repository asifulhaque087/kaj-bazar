import { seller__axios } from "@/api/common/axios.service";
import { CreateSellerFormFields } from "@/api/sellers/mutations/create-seller/create-seller.type";

export const createSellerApi = async (data: CreateSellerFormFields) => {
  const response = await seller__axios.post(`/create`, data);
  return response.data;
};

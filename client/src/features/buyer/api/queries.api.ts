import { buyer__axios } from "@/axios.service";
import { Buyer } from "@/features/buyer/schemas/buyer.schema";

export const currentBuyer = async (): Promise<Buyer> => {
  const response = await buyer__axios.get<Buyer>(`/current-buyer`);
  return response.data;
};

export const getBuyerByName = async (username: string) => {
  const response = await buyer__axios.get<Buyer>(`/username/${username}`);
  return response.data;
};

export const getBuyerById = async (id: string) => {
  const response = await buyer__axios.get<Buyer>(`/${id}`);
  return response.data;
};

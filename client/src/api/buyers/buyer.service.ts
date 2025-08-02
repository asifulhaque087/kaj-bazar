import { buyer__axios } from "@/api/common/axios.service";
import { Buyer } from "@/schemas";

export const currentBuyer = async (): Promise<Buyer> => {
  const response = await buyer__axios.get<Buyer>(`/current-buyer`);
  return response.data;
};

export const getBuyerByName = async (username: string) => {
  const response = await buyer__axios.get<Buyer>(`/username/${username}`);
  return response.data;
};

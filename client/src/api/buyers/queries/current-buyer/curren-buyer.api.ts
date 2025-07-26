import { Buyer } from "@/api/buyers/queries/current-buyer/curren-buyer.type";
import { buyer__axios } from "@/api/common/axios.service";

export const currentBuyer = async (): Promise<Buyer> => {
  const response = await buyer__axios.get<Buyer>(`/current-buyer`);
  return response.data;
};

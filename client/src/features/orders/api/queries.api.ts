import { order__axios } from "@/api/common/axios.service";
import { Order } from "@/schemas";

export const getOrderById = async (id: string) => {
  const response = await order__axios.get<Order>(`/${id}`);
  return response.data;
};

import { order__axios } from "@/api/common/axios.service";
import { CreateOrderPayload, Order } from "@/schemas";

export const createOrder = async (data: CreateOrderPayload) => {
  const response = await order__axios.post<Order>(`/create`, data);
  return response.data;
};

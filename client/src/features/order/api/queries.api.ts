import { order__axios } from "@/axios.service";
import { Order } from "@/features/order/schemas/order.schema";

export const getOrderById = async (id: string) => {
  const response = await order__axios.get<Order>(`/${id}`);
  return response.data;
};

export const GetBuyerOrders = async (buyerId: string) => {
  const response = await order__axios.get<Order[]>(`/buyer/${buyerId}`);
  return response.data;
};

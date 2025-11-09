import { order__axios } from "@/axios.service";
import { CreateOrderPayload } from "@/features/order/schemas/create-order.schema";
import { DeliveredWorkPayload } from "@/features/order/schemas/deliver-work.schema";
import { Order } from "@/features/order/schemas/order.schema";
import { StartOrderPayload } from "@/features/order/schemas/start-order.schema";

export const createOrder = async (data: CreateOrderPayload) => {
  const response = await order__axios.post<Order>(`/create`, data);
  return response.data;
};

export const startOrder = async (data: StartOrderPayload) => {
  const response = await order__axios.post<Order>(`/start-order`, data);
  return response.data;
};

export const deliverWork = async (data: DeliveredWorkPayload) => {
  const response = await order__axios.post<Order>(`/deliver-work`, data);
  return response.data;
};

export const approveDelivery = async (id: string) => {
  const response = await order__axios.post<Order>(`/approve-delivery`, { id });
  return response.data;
};

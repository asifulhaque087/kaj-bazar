import { order__axios } from "@/api/common/axios.service";
import { CreateOrderPayload } from "@/features/orders/schemas/create-order.schema";
import { DeliveredWorkPayload } from "@/features/orders/schemas/deliver-work.schema";
import { StartOrderPayload } from "@/features/orders/schemas/start-order.schema";
import { Order } from "@/schemas";

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

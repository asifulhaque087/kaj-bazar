import { order__axios } from "@/api/common/axios.service";
import {
  CreateOrderPayload,
  DeliveredWorkPayload,
  Order,
  StartOrderPayload,
} from "@/schemas";

export const createOrder = async (data: CreateOrderPayload) => {
  const response = await order__axios.post<Order>(`/create`, data);
  return response.data;
};

export const getOrderById = async (id: string) => {
  const response = await order__axios.get<Order>(`/${id}`);
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

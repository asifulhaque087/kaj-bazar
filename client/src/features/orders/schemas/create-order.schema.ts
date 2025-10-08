import z from "zod";
import { orderSchema } from "@/schemas";

export const createOrderForm = orderSchema.omit({
  id: true,
  orderStatus: true,
  deliveryDueDate: true,
});

export type CreateOrderForm = z.infer<typeof createOrderForm>;
export type CreateOrderPayload = z.infer<typeof createOrderForm>;

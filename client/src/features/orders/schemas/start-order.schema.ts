import z from "zod";

export const startOrderForm = z.object({
  id: z.string(),
  requirement: z.string().optional(),
});

export type StartOrderForm = z.infer<typeof startOrderForm>;
export type StartOrderPayload = z.infer<typeof startOrderForm>;

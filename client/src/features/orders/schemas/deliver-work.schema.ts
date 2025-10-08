import z from "zod";

export const deliveredWorkForm = z.object({
  file: z.instanceof(File, { message: "File is required." }),
  message: z.string().min(1, { message: "Message is required." }).optional(),
});

export type DeliveredWorkForm = z.infer<typeof deliveredWorkForm>;

export const deliveredWorkPalyload = z.object({
  id: z.string(),
  file: z.string(),
  message: z.string().optional(),
});

export type DeliveredWorkPayload = z.infer<typeof deliveredWorkPalyload>;

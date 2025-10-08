import { z } from "zod";

export const authSchema = z.object({
  id: z.string().uuid(), // uuid with a defaultRandom, so optional on creation
  username: z.string(),
  email: z.string(),
  profilePublicId: z.string(),
  profilePicture: z.string().url(),
  // ** optional
  country: z.string().optional().nullable(),
  emailVerified: z.boolean(),
  browserName: z.string().optional().nullable(),
  deviceType: z.string().optional().nullable(),
});

export type Auth = z.infer<typeof authSchema>;


// ** Third party imports
// import { z } from "zod";

import { insertAuthSchema } from "@src/drizzle/schema";

// ** Local imports

export const signUpValidation = insertAuthSchema;

export const loginValidation = insertAuthSchema.pick({
  username: true,
  email: true,
  password: true,
});

// export type registerUser = z.infer<typeof registerUserSchema>;

// export const loginUserValidation = insertUserSchema.omit({
//   id: true,
//   name: true,
//   refreshToken: true,
// });

// export type LoginUser = z.infer<typeof loginUserSchema>;

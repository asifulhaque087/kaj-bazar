import { LoginApi } from "@/api/auth/auth.types";
import { auth__axios } from "@/axios.service";
import { LoginForm } from "@/features/auth/schemas/login.schema";
import { RegisterPayload } from "@/features/auth/schemas/register.schema";

// ** --- Mutations ---
export const login = async (data: LoginForm) => {
  const response = await auth__axios.post<LoginApi>(`/signin`, data);
  return response.data;
};

export const register = async (data: RegisterPayload) => {
  const response = await auth__axios.post(`/register`, data);
  return response.data;
};

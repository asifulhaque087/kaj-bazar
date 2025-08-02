import { LoginApi } from "@/api/auth/auth.types";
import { auth__axios } from "@/api/common/axios.service";
import { Auth, LoginForm, RegisterPayload } from "@/schemas";

// ** --- Queries ---
export async function getAuthUser(): Promise<Auth> {
  const response = await auth__axios.get<Auth>(`/currentuser`);
  return response.data;
}

// ** --- Mutations ---
export const login = async (data: LoginForm) => {
  const response = await auth__axios.post<LoginApi>(`/signin`, data);
  return response.data;
};

export const register = async (data: RegisterPayload) => {
  const response = await auth__axios.post(`/register`, data);
  return response.data;
};

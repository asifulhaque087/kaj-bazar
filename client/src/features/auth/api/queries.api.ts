// import { auth__axios } from "@/axios.service";
import { auth__axios } from "@/axios.service";
import { Auth } from "@/features/auth/schemas/auth.schema";

// ** --- Queries ---
export async function getAuthUser(): Promise<Auth> {
  const response = await auth__axios.get<Auth>(`/currentuser`);
  return response.data;
}

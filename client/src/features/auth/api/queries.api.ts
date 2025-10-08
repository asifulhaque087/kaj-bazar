import { auth__axios } from "@/api/common/axios.service";
import { Auth } from "@/schemas";

// ** --- Queries ---
export async function getAuthUser(): Promise<Auth> {
  const response = await auth__axios.get<Auth>(`/currentuser`);
  return response.data;
}

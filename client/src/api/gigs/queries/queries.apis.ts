import { apiService } from "@/api/common/axios.service";
import { Gig } from "@/api/gigs/schemas/gig.schema";

const axios = apiService("/gigs");

export const searchGigs = async (q: string) => {
  const response = await axios.get<Gig[]>(`/search?${q}`);
  return response.data;
};

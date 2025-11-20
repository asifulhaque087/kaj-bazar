import { gig__axios } from "@/axios.service";
import { Gig } from "@/features/gig/schemas/gig.schema";

// Define a type for the API response if it includes totalCount
interface SearchGigsResponse {
  data: Gig[];
  totalCount: number;
}

export const searchGigs = async (
  q: string,
  page: number,
  limit: number
): Promise<SearchGigsResponse> => {
  // Append page and limit to the query string
  const response = await gig__axios.get<SearchGigsResponse>(
    `/search?${q}&page=${page}&limit=${limit}`
  );
  return response.data; // Ensure your API returns an object with data and totalCount
};

export const getGigById = async (id: string): Promise<Gig> => {
  const response = await gig__axios.get<Gig>(`/${id}`);
  return response.data;
};

export const getSellerGigs = async (
  sellerId: string,
  q?: string
): Promise<Gig[]> => {
  const response = await gig__axios.get<Gig[]>(`/seller/${sellerId}?${q}`);
  return response.data;
};

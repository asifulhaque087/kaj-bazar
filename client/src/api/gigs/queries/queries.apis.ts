// import { apiService } from "@/api/common/axios.service";
// import { Gig } from "@/api/gigs/schemas/gig.schema";

// const axios = apiService("/gigs");

// export const searchGigs = async (q: string) => {
//   const response = await axios.get<Gig[]>(`/search?${q}`);
//   return response.data;
// };

import { apiService } from "@/api/common/axios.service";
import { Gig } from "@/api/gigs/schemas/gig.schema";

const axios = apiService("/gigs");

// Define a type for the API response if it includes totalCount
interface SearchGigsResponse {
  data: Gig[];
  totalCount: number; // Assuming your API returns totalCount
}

export const searchGigs = async (
  q: string,
  page: number,
  limit: number
): Promise<SearchGigsResponse> => {
  // Append page and limit to the query string
  const response = await axios.get<SearchGigsResponse>(
    `/search?${q}&page=${page}&limit=${limit}`
  );
  return response.data; // Ensure your API returns an object with data and totalCount
};

export const getGigById = async (id: number): Promise<Gig> => {
  const response = await axios.get<Gig>(`/${id}`);
  return response.data;
};

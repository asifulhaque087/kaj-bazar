import { gig__axios } from "@/axios.service";
import { CreateGigPayload, UpdateGigPayload } from "@/schemas";

export const createGig = async (data: CreateGigPayload) => {
  const response = await gig__axios.post(`/create`, data);
  return response.data;
};

export const updateGig = async (data: UpdateGigPayload) => {
  const response = await gig__axios.put(`/update`, data);
  return response.data;
};

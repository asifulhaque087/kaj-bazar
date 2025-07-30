import { config } from "@/config";
import axios, { type AxiosInstance } from "axios";

export const apiService = (serviceRelativePath: string): AxiosInstance => {
  const instance = axios.create({
    baseURL: config.API_GATEWAY_URL + serviceRelativePath,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    withCredentials: true,
  });
  return instance;
};

export const auth__axios = apiService("/auth");
export const seller__axios = apiService("/sellers");
export const buyer__axios = apiService("/buyers");
export const gig__axios = apiService("/gigs");
export const chat__axios = apiService("/chats");

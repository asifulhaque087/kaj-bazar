import type { Request, Response } from "express";
import { type AxiosResponse, AxiosError } from "axios";

const sellerOrders = async (req: Request, res: Response) => {
  const { sellerId } = req.params;
  const queryString = objectToQueryString(req.query);
  try {
    const apiService = req.protectedAxios!;
    const response: AxiosResponse = await apiService.axios.get(
      `/seller/${sellerId}?${queryString}`
    );

    return res.json(response.data);
  } catch (error) {
    if (!(error instanceof AxiosError && error.response))
      throw new Error("Server Error");
    return res.status(error.response.status).json(error.response.data);
  }
};

const objectToQueryString = (obj: { [key: string]: any }): string => {
  let query: string = "";
  const objList: [string, any][] = Object.entries(obj);
  const lastItemIndex: number = objList.length - 1;

  objList.forEach(([key, value]: [string, any], index: number) => {
    // It's good practice to encode URI components for URL safety
    query += `${encodeURIComponent(key)}=${encodeURIComponent(value || "")}`;
    if (index !== lastItemIndex) {
      query += "&";
    }
  });
  return query;
};

export default sellerOrders;

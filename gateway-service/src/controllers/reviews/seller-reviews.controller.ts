import type { Request, Response } from "express";
import { AxiosError } from "axios";
import { catchError } from "@fvoid/shared-lib";

const getSellerReviews = async (req: Request, res: Response) => {
  const { sellerId } = req.params;

  const apiService = req.protectedAxios!;

  const [err, response] = await catchError(
    apiService.axios.get(`/seller/${sellerId}`)
  );

  if (response) return res.json(response.data);

  if (!(err instanceof AxiosError && err.response))
    throw new Error("Server Error");

  return res.status(err.response.status).json(err.response.data);
};

export default getSellerReviews;

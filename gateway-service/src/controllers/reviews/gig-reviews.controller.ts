import type { Request, Response } from "express";
import { type AxiosResponse, AxiosError } from "axios";
import { catchError } from "@fvoid/shared-lib";

const getGigReviews = async (req: Request, res: Response) => {
  const { gigId } = req.params;

  const apiService = req.protectedAxios!;

  // const response: AxiosResponse = await apiService.axios.get(`/gig/${gigId}`);

  const [err, response] = await catchError(
    apiService.axios.get(`/gig/${gigId}`)
  );

  if (response) return res.json(response.data);

  if (!(err instanceof AxiosError && err.response))
    throw new Error("Server Error");

  return res.status(err.response.status).json(err.response.data);
};

// const getGigReviews = async (req: Request, res: Response) => {
//   const { gigId } = req.params;

//   try {
//     const apiService = req.protectedAxios!;
//     const response: AxiosResponse = await apiService.axios.get(`/gig/${gigId}`);

//     return res.json(response.data);
//   } catch (error) {
//     if (!(error instanceof AxiosError && error.response))
//       throw new Error("Server Error");
//     return res.status(error.response.status).json(error.response.data);
//   }
// };

export default getGigReviews;

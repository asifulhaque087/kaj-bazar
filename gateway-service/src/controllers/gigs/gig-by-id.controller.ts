import type { Request, Response } from "express";
import { type AxiosResponse, AxiosError } from "axios";

const getGigById = async (req: Request, res: Response) => {
  const { gigId } = req.params;

  try {
    const apiService = req.publicAxios!;
    const response: AxiosResponse = await apiService.axios.get(`/${gigId}`);

    return res.json(response.data);
  } catch (error) {
    if (!(error instanceof AxiosError && error.response))
      throw new Error("Server Error");
    return res.status(error.response.status).json(error.response.data);
  }
};

export default getGigById;

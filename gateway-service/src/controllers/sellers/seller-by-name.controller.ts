import type { Request, Response } from "express";
import { type AxiosResponse, AxiosError } from "axios";

const getSellerByName = async (req: Request, res: Response) => {
  const { username } = req.params;

  try {
    const apiService = req.protectedAxios!;

    const response: AxiosResponse = await apiService.axios.get(
      `/username/${username}`
    );

    return res.json(response.data);
  } catch (error) {
    if (!(error instanceof AxiosError && error.response))
      throw new Error("Server Error");

    return res.status(error.response.status).json(error.response.data);
  }
};

export default getSellerByName;

import type { Request, Response } from "express";
import { type AxiosResponse, AxiosError } from "axios";

const createMessage = async (req: Request, res: Response) => {
  const body = req.body;

  try {
    const apiService = req.protectedAxios!;
    const response: AxiosResponse = await apiService.axios.post(
      `/message/create-message`,
      body
    );

    return res.json(response.data);
  } catch (error) {
    if (!(error instanceof AxiosError && error.response))
      throw new Error("Server Error");
    return res.status(error.response.status).json(error.response.data);
  }
};

export default createMessage;

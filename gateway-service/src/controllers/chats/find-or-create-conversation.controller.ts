import type { Request, Response } from "express";
import { type AxiosResponse, AxiosError } from "axios";

const findOrCreateConversation = async (req: Request, res: Response) => {
  const body = req.body;

  // console.log("hello 2 from controller");

  try {
    const apiService = req.protectedAxios!;
    const response: AxiosResponse = await apiService.axios.post(
      `/conversation/find-or-create`,
      body
    );

    return res.json(response.data);
  } catch (error) {
    if (!(error instanceof AxiosError && error.response))
      throw new Error("Server Error");
    return res.status(error.response.status).json(error.response.data);
  }
};

export default findOrCreateConversation;

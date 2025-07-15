import type { Request, Response } from "express";
import { type AxiosResponse, AxiosError } from "axios"; // Import AxiosResponse and AxiosError

const resetPassword = async (req: Request, res: Response) => {
  const body = req.body;
  const { token } = req.params;

  try {
    const apiService = req.publicAxios!;
    const response: AxiosResponse = await apiService.axios.put(
      `/reset-password/${token}`,
      body
    );

    // Send response data
    return res.json(response.data);
  } catch (error) {
    if (!(error instanceof AxiosError && error.response))
      throw new Error("Server Error");

    return res.status(error.response.status).json(error.response.data);
  }
};

export default resetPassword;

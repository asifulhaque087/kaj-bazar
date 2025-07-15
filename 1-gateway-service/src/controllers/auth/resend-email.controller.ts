import type { Request, Response } from "express";
import { type AxiosResponse, AxiosError } from "axios"; // Import AxiosResponse and AxiosError

const resendEmail = async (req: Request, res: Response) => {
  const body = req.body;

  try {
    const apiService = req.publicAxios!;

    // Make request to auth service
    const response: AxiosResponse = await apiService.axios.post(
      "/resend-email",
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

export default resendEmail;

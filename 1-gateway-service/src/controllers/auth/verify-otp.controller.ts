import type { Request, Response } from "express";
import { type AxiosResponse, AxiosError } from "axios"; // Import AxiosResponse and AxiosError

const verifyOtp = async (req: Request, res: Response) => {
  const { otp } = req.params;

  try {
    const apiService = req.protectedAxios!;

    // Make request to auth service
    const response: AxiosResponse = await apiService.axios.put(
      `/verify-otp/${otp}`
    );

    // Send response data
    return res.json(response.data);
  } catch (error) {
    if (!(error instanceof AxiosError && error.response))
      throw new Error("Server Error");

    return res.status(error.response.status).json(error.response.data);
  }
};

export default verifyOtp;

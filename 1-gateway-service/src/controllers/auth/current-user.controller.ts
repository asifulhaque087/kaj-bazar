import type { Request, Response } from "express";
import { type AxiosResponse, AxiosError } from "axios"; // Import AxiosResponse and AxiosError

const currentUser = async (req: Request, res: Response) => {
  try {
    const apiService = req.protectedAxios!;
    const response: AxiosResponse = await apiService.axios.get("/currentuser");
    // Send response data
    return res.json(response.data);
  } catch (error) {
    if (!(error instanceof AxiosError && error.response))
      throw new Error("Server Error");

    return res.status(error.response.status).json(error.response.data);
  }
};

export default currentUser;

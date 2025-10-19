import type { Request, Response } from "express";
import { type AxiosResponse, AxiosError } from "axios"; // Import AxiosResponse and AxiosError

const authSeed = async (req: Request, res: Response) => {
  const { count } = req.params;

  try {
    const apiService = req.publicAxios!;
    const response: AxiosResponse = await apiService.axios.put(
      `/seed/${count}`
    );
    // Send response data
    return res.json(response.data);
  } catch (error) {
    if (!(error instanceof AxiosError && error.response))
      throw new Error("Server Error");

    return res.status(error.response.status).json(error.response.data);
  }

  // return res.json({ m: "This is auth seeding " });
};

export default authSeed;

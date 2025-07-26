import type { Request, Response } from "express";
import { type AxiosResponse, AxiosError } from "axios"; // Import AxiosResponse and AxiosError

const currentUser = async (req: Request, res: Response) => {
  // console.log(
  //   "hello I am from current user ####################################"
  // );

  try {
    const apiService = req.protectedAxios!;

    console.log("api service @#@#@#@#@#@#@#@#@#@@# ", apiService);
    const response: AxiosResponse = await apiService.axios.get("/currentuser");

    console.log("api service after @#@#@#@#@#@#@#@#@#@@# ", apiService);
    // Send response data
    return res.json(response.data);
  } catch (error) {
    if (!(error instanceof AxiosError && error.response))
      throw new Error("Server Error");

    return res.status(error.response.status).json(error.response.data);
  }
};

export default currentUser;

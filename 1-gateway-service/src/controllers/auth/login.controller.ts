import type { Request, Response } from "express";
import { type AxiosResponse, AxiosError } from "axios"; // Import AxiosResponse and AxiosError

const login = async (req: Request, res: Response) => {
  const body = req.body;

  try {
    const apiService = req.publicAxios!;

    // Make request to auth service
    const response: AxiosResponse = await apiService.axios.post(
      "/signin",
      body
    );

    // Access session from the request object (set by cookie-session middleware)
    req.session = { jwt: response.data.token };

    // Send response data

    return res.json(response.data);

    // res.json({
    //   message: response.data.message,
    //   user: response.data.user,
    // });
  } catch (error) {
    if (!(error instanceof AxiosError && error.response))
      throw new Error("Server Error");

    return res.status(error.response.status).json(error.response.data);
  }
};

export default login;

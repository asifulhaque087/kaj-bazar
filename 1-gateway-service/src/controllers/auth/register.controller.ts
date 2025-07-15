import type { Request, Response } from "express";
import { type AxiosResponse, AxiosError } from "axios"; // Import AxiosResponse and AxiosError

const register = async (req: Request, res: Response) => {
  const body = req.body;

  try {
    const publicAxios = req.publicAxios!;

    // Make request to auth service
    const response: AxiosResponse = await publicAxios.axios.post(
      "/signup",
      body
    );

    // Access session from the request object (set by cookie-session middleware)
    req.session = { jwt: response.data.token };

    // Send response data
    res.json({
      message: response.data.message,
      user: response.data.user,
    });
  } catch (error) {
    if (!(error instanceof AxiosError && error.response))
      throw new Error("Server Error");

    res.status(error.response.status).json(error.response.data);
  }
};

export default register;

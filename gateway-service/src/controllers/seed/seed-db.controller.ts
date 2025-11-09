import type { Request, Response } from "express";
import { type AxiosResponse, AxiosError } from "axios";
import { config } from "@src/config";

const seedDB = async (req: Request, res: Response) => {
  console.log(
    "@@@@@@@@@@@@@@@@ from seedDB ",
    `${config.SEED_BASE_URL}/api/v1/seeds`
  );

  try {
    const apiService = req.publicAxios!;

    const response: AxiosResponse = await apiService.axios.post(`/db`);

    return res.json(response.data);
  } catch (error) {
    if (!(error instanceof AxiosError && error.response))
      throw new Error("Server Error");

    return res.status(error.response.status).json(error.response.data);
  }
};

export default seedDB;

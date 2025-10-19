import type { Request, Response } from "express";
import { type AxiosResponse, AxiosError } from "axios";

const getOrderById = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("the dssdsdsds !!!!!!!! ", id);

  try {
    const apiService = req.protectedAxios!;
    const response: AxiosResponse = await apiService.axios.get(`/${id}`);

    return res.json(response.data);
  } catch (error) {
    if (!(error instanceof AxiosError && error.response))
      throw new Error("Server Error");
    return res.status(error.response.status).json(error.response.data);
  }
};

export default getOrderById;

import type { Request, Response } from "express";
import { type AxiosResponse, AxiosError } from "axios"; // Import AxiosResponse and AxiosError

const searchGig = async (req: Request, res: Response) => {
  const { from, size, type } = req.params;

  const queryParams = req.query;

  let queryString = "";

  const objList = Object.entries(queryParams);
  const lastItemIndex = objList.length - 1;

  objList.forEach(([key, value], index) => {
    queryString += `${key}=${String(value)}${
      index !== lastItemIndex ? "&" : ""
    }`;
  });

  //    return res.json(queryString);

  try {
    // Todo: get the public api service

    const apiService = req.publicAxios!;

    const response: AxiosResponse = await apiService.axios.get(
      `/gig/search/gig/${from}/${size}/${type}?${queryString})`
    );

    return res.json(response);

    //   return res.json({
    //     message: response.data.message,
    //     total: response.data.total,
    //     gigs: response.data.gigs,
    //   });
  } catch (error) {
    if (!(error instanceof AxiosError && error.response))
      throw new Error("Server Error");

    return res.status(error.response.status).json(error.response.data);
  }
};

export default searchGig;

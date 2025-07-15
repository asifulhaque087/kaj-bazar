import type { Request, Response } from "express";
import { type AxiosResponse, AxiosError } from "axios"; // Import AxiosResponse and AxiosError

const logout = async (req: Request, res: Response) => {
  return res.json({ m: "This is signout" });
};

export default logout;

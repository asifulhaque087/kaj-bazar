import type { Request, Response } from "express";

const logout = async (req: Request, res: Response) => {
  req.session = null;
  return res.json({ message: "Logout successful", user: {} });
};

export default logout;

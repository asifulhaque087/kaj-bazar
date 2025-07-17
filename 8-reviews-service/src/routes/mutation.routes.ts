import { Router, type Request, type Response } from "express";

const mutationRouter = Router();

mutationRouter.post(
  "/",

  (req: Request, res: Response) => {
    return res.json({ m: "I am from create review" });
  }
);

export default mutationRouter;

import { Router, type Request, type Response } from "express";

const mutationRouter = Router();

mutationRouter.post(
  "/",

  (req: Request, res: Response) => {
    return res.json({
      m: "I am from create a message",
    });
  }
);
mutationRouter.put(
  "/offer",

  (req: Request, res: Response) => {
    return res.json({
      m: "I am from create an offer",
    });
  }
);
mutationRouter.put(
  "/mark-as-read",

  (req: Request, res: Response) => {
    return res.json({
      m: "I am from make a message as read",
    });
  }
);
mutationRouter.put(
  "/mark-multiple-as-read",

  (req: Request, res: Response) => {
    return res.json({
      m: "I am from mark many message as read",
    });
  }
);

export default mutationRouter;

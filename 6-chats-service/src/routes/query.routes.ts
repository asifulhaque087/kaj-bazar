import { Router, type Request, type Response } from "express";

const queryRouter: Router = Router();

queryRouter.get(
  "/conversation/:senderUsername/:receiverUsername",
  (req: Request, res: Response) => {
    return res.json({ m: "I am from Get conversation by sender and receiver" });
  }
);
queryRouter.get(
  "/conversations/:username",

  (req: Request, res: Response) => {
    return res.json({ m: "I am from Get conversation by username" });
  }
);
queryRouter.get(
  "/:senderUsername/:receiverUsername",

  (req: Request, res: Response) => {
    return res.json({
      m: "I am from I think Get Message by sender and username",
    });
  }
);
queryRouter.get(
  "/:conversationId",

  (req: Request, res: Response) => {
    return res.json({
      m: "I am from Get Message by conversation id",
    });
  }
);

export default queryRouter;

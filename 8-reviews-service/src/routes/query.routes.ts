import { Router, type Request, type Response } from "express";

const queryRouter: Router = Router();

queryRouter.get(
  "/gig/:gigId",

  (req: Request, res: Response) => {
    return res.json({ m: "I am from Get reviews by gig id " });
  }
);
queryRouter.get(
  "/seller/:sellerId",

  (req: Request, res: Response) => {
    return res.json({ m: "I am from Get reviews by seller id " });
  }
);

export default queryRouter;

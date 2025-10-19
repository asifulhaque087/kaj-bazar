import getOrderById from "@src/controllers/order-by-id.controller";
import { Router, type Request, type Response } from "express";

const queryRouter = Router();

queryRouter.get(
  "/notification/:userTo",

  (req: Request, res: Response) => {
    return res.json({ m: "I am from Get notifications by user id" });
  }
);

queryRouter.get(
  "/seller/:sellerId",

  (req: Request, res: Response) => {
    return res.json({ m: "I am from get orders by seller id" });
  }
);
queryRouter.get(
  "/buyer/:buyerId",

  (req: Request, res: Response) => {
    return res.json({ m: "I am from Get orders by buyer id " });
  }
);

queryRouter.get("/:id", getOrderById);

export default queryRouter;

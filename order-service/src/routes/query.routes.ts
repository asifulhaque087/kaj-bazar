import buyerOrders from "@src/controllers/buyer-orders.controller";
import getOrderById from "@src/controllers/order-by-id.controller";
import sellerOrders from "@src/controllers/seller-orders.controller";
import { Router } from "express";

const queryRouter = Router();

// queryRouter.get(
//   "/notification/:userTo",

//   (req: Request, res: Response) => {
//     return res.json({ m: "I am from Get notifications by user id" });
//   }
// );

queryRouter.get("/buyer/:buyerId", buyerOrders);
queryRouter.get("/seller/:sellerId", sellerOrders);

queryRouter.get("/:id", getOrderById);

export default queryRouter;

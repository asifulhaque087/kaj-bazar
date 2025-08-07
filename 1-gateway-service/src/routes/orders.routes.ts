import { config } from "@src/config";
import approveDelivery from "@src/controllers/orders/approve-delivery.controller";
import createOrder from "@src/controllers/orders/create-order.controller";
import deliverWork from "@src/controllers/orders/deliver-work.controller";
import getOrderById from "@src/controllers/orders/order-by-id.controller";
import startOrder from "@src/controllers/orders/start-order.controller";
import { apiMiddleware } from "@src/middlewares/api.middleware";
import { verifyJwtToken } from "@src/middlewares/verify-jwt.middleware";
import { Router } from "express";

const orderRouter = Router();

orderRouter.use(
  apiMiddleware(`${config.ORDER_BASE_URL}/api/v1/orders`, "orders")
);

orderRouter.post("/create", verifyJwtToken, createOrder);
orderRouter.post("/start-order", verifyJwtToken, startOrder);
orderRouter.post("/deliver-work", verifyJwtToken, deliverWork);
orderRouter.post("/approve-delivery", verifyJwtToken, approveDelivery);
orderRouter.get("/:id", verifyJwtToken, getOrderById);

export default orderRouter;

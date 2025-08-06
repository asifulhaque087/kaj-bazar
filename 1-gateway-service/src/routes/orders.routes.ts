import { config } from "@src/config";
import createOrder from "@src/controllers/orders/create-order.controller";
import { apiMiddleware } from "@src/middlewares/api.middleware";
import { verifyJwtToken } from "@src/middlewares/verify-jwt.middleware";
import { Router } from "express";

const orderRouter = Router();

orderRouter.use(
  apiMiddleware(`${config.ORDER_BASE_URL}/api/v1/orders`, "orders")
);

orderRouter.post("/create", verifyJwtToken, createOrder);

export default orderRouter;

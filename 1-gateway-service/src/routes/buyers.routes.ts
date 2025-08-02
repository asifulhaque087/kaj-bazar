import { config } from "@src/config";
import getBuyerByName from "@src/controllers/buyers/buyer-by-name.controller";
import currentBuyer from "@src/controllers/buyers/curren-buyer.controller";
import { apiMiddleware } from "@src/middlewares/api.middleware";
import { verifyJwtToken } from "@src/middlewares/verify-jwt.middleware";
import { Router } from "express";

const buyerRouter = Router();

buyerRouter.use(
  apiMiddleware(`${config.USERS_BASE_URL}/api/v1/buyers`, "users")
);

buyerRouter.get("/current-buyer", verifyJwtToken, currentBuyer);
buyerRouter.get("/username/:username", verifyJwtToken, getBuyerByName);

export default buyerRouter;

import { config } from "@src/config";
import { apiMiddleware } from "@src/middlewares/api.middleware";
import { Router } from "express";

const buyerRouter = Router();

buyerRouter.use(
  apiMiddleware(`${config.USERS_BASE_URL}/api/v1/buyers`, "users")
);

export default buyerRouter;

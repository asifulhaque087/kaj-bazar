import { config } from "@src/config";
import seedSellers from "@src/controllers/sellers/seed-sellers.controller";
import { apiMiddleware } from "@src/middlewares/api.middleware";
import { Router } from "express";

const sellerRouter = Router();

sellerRouter.use(
  apiMiddleware(`${config.USERS_BASE_URL}/api/v1/sellers`, "users")
);

sellerRouter.put("/seed/:count", seedSellers);

export default sellerRouter;

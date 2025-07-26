import { config } from "@src/config";
import createSeller from "@src/controllers/sellers/create-seller.controller";
import seedSellers from "@src/controllers/sellers/seed-sellers.controller";
import { apiMiddleware } from "@src/middlewares/api.middleware";
import { Router } from "express";

const sellerRouter = Router();

sellerRouter.use(
  apiMiddleware(`${config.USERS_BASE_URL}/api/v1/sellers`, "users")
);

sellerRouter.post("/create", createSeller);
sellerRouter.put("/seed/:count", seedSellers);

export default sellerRouter;

import { config } from "@src/config";
import createSeller from "@src/controllers/sellers/create-seller.controller";
import seedSellers from "@src/controllers/sellers/seed-sellers.controller";
import getSellerByName from "@src/controllers/sellers/seller-by-name.controller";
import { apiMiddleware } from "@src/middlewares/api.middleware";
import { verifyJwtToken } from "@src/middlewares/verify-jwt.middleware";
import { Router } from "express";

const sellerRouter = Router();

sellerRouter.use(
  apiMiddleware(`${config.USERS_BASE_URL}/api/v1/sellers`, "users")
);

sellerRouter.post("/create", createSeller);
sellerRouter.put("/seed/:count", seedSellers);
sellerRouter.get("/username/:username", verifyJwtToken, getSellerByName);

export default sellerRouter;

import { config } from "@src/config";
import createSeller from "@src/controllers/sellers/create-seller.controller";
import getCurrentSeller from "@src/controllers/sellers/get-current-seller.controller";
import seedSellers from "@src/controllers/sellers/seed-sellers.controller";
import getSellerById from "@src/controllers/sellers/seller-by-id.controller";
import getSellerByName from "@src/controllers/sellers/seller-by-name.controller";
import updateSeller from "@src/controllers/sellers/update-seller.controller";
import { apiMiddleware } from "@src/middlewares/api.middleware";
import { verifyJwtToken } from "@src/middlewares/verify-jwt.middleware";
import { Router } from "express";

const sellerRouter = Router();

sellerRouter.use(
  apiMiddleware(`${config.USER_BASE_URL}/api/v1/sellers`, "users")
);

sellerRouter.post("/create", createSeller);

sellerRouter.put("/seed/:count", seedSellers);
sellerRouter.put("/update", verifyJwtToken, updateSeller);

sellerRouter.get("/username/:username", verifyJwtToken, getSellerByName);
sellerRouter.get("/current-seller", verifyJwtToken, getCurrentSeller);
// sellerRouter.get("/:sellerId", verifyJwtToken, getSellerById);
sellerRouter.get("/:sellerId", getSellerById);

export default sellerRouter;

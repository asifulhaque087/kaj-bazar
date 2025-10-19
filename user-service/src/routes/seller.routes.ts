// ** Third Party Imports
import { Router } from "express";

// ** Local Imports
import createSeller from "@src/controllers/create-seller.controller";
import getRandomSellers from "@src/controllers/random-sellers.controller";
import seedSeller from "@src/controllers/seed-seller.controller";
import getSellerById from "@src/controllers/seller-by-id.controller";
import getSellerByName from "@src/controllers/seller-by-name.controller";
import updateSeller from "@src/controllers/update-seller.controller";
import { validateData } from "@src/middlewares/validation.middleware";
import { createSellerSchema } from "@src/validations/create-serller.validation";
import { verifyClientToken } from "@fvoid/shared-lib";
import { config } from "@src/config";
import getCurrentSeller from "@src/controllers/get-current-seller.controller";

const sellerRouter = Router();

sellerRouter.get("/username/:username", getSellerByName);
sellerRouter.get("/random/:size", getRandomSellers);
sellerRouter.get(
  "/current-seller",
  verifyClientToken(config.JWT_TOKEN),
  getCurrentSeller
);
sellerRouter.get("/:sellerId", getSellerById);

sellerRouter.post("/create", validateData(createSellerSchema), createSeller);

sellerRouter.put("/seed/:count", seedSeller);
sellerRouter.put("/update", updateSeller);

export default sellerRouter;

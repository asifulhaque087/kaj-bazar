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

const sellerRouter = Router();

sellerRouter.get("/id/:sellerId", getSellerById);
sellerRouter.get("/username/:username", getSellerByName);
sellerRouter.get("/random/:size", getRandomSellers);
sellerRouter.post("/create", validateData(createSellerSchema), createSeller);
sellerRouter.put("/:sellerId", updateSeller);
sellerRouter.put("/seed/:count", seedSeller);

export default sellerRouter;

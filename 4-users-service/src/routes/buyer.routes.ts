// ** Third Party Imports
import { Router } from "express";

// ** Local Imports
import getBuyerByEmail from "@src/controllers/buyer-by-email.controller";
import getBuyerByName from "@src/controllers/buyer-by-name.controller";
import currentBuyer from "@src/controllers/current-buyer.controller";

const buyerRouter = Router();

buyerRouter.get("/email", getBuyerByEmail);
buyerRouter.get("/username", currentBuyer);
buyerRouter.get("/:username", getBuyerByName);

export default buyerRouter;

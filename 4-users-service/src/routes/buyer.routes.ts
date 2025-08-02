// ** Third Party Imports
import { Router } from "express";

// ** Local Imports
import getBuyerByEmail from "@src/controllers/buyer-by-email.controller";
import getBuyerByName from "@src/controllers/buyer-by-name.controller";
import currentBuyer from "@src/controllers/current-buyer.controller";
import { verifyClientToken } from "@fvoid/shared-lib";
import { config } from "@src/config";

const buyerRouter = Router();

buyerRouter.get("/email", getBuyerByEmail);
// buyerRouter.get("/username", currentBuyer);

buyerRouter.get(
  "/current-buyer",
  verifyClientToken(config.JWT_TOKEN),
  currentBuyer
);

buyerRouter.get("/username/:username", getBuyerByName);

export default buyerRouter;

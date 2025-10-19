// ** Third party imports
import { Router } from "express";

// ** Local Imports
import currentUser from "@src/controllers/current-user.controller";
import refreshToken from "@src/controllers/refresh-token.controller";
import { verifyClientToken } from "@fvoid/shared-lib";
import { config } from "@src/config";

const identityRouter = Router();

// Todo -  verifyClientToken(config.JWT_TOKEN),

// ** Refresh token
identityRouter.get(
  "/refresh-token",
  verifyClientToken(config.JWT_TOKEN),
  refreshToken
);

// ** Get Current User
identityRouter.get(
  "/currentuser",
  verifyClientToken(config.JWT_TOKEN),
  currentUser
);

export default identityRouter;

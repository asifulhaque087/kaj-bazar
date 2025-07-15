// ** Third party imports
import { Router } from "express";

// ** Local Imports
import currentUser from "@src/controllers/current-user.controller";
import refreshToken from "@src/controllers/refresh-token.controller";
import { verifyClientToken } from "@src/middlewares/verfiyClientToken.middleware";

const identityRouter = Router();

// Todo -  verifyClientToken(config.JWT_TOKEN),

// ** Refresh token
identityRouter.get("/refresh-token", verifyClientToken, refreshToken);

// ** Get Current User
identityRouter.get("/currentuser", verifyClientToken, currentUser);

export default identityRouter;

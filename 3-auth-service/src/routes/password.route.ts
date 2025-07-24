// ** Third party imports
import { Router } from "express";

// ** Local Importa
import {
  changePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "@src/validations/password.validation";
import forgotPassword from "@src/controllers/forgot-password.controller";
import resetPassword from "@src/controllers/reset-password.controller";
import changePassword from "@src/controllers/change-password.controller";
import { validateData, verifyClientToken } from "@fvoid/shared-lib";
import { config } from "@src/config";

const passwordRouter = Router();

// ** Forgot Password
passwordRouter.put(
  "/forgot-password",
  validateData(forgotPasswordSchema),
  forgotPassword
);

// ** Reset Password
passwordRouter.put(
  "/reset-password/:token",
  validateData(resetPasswordSchema),
  resetPassword
);

// ** Change Password
passwordRouter.put(
  "/change-password",
  verifyClientToken(config.JWT_TOKEN),
  validateData(changePasswordSchema),
  changePassword
);

export default passwordRouter;

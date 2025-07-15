// ** Third party imports
import { Router } from "express";

// ** Local Importa
import {
  changePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "@src/validations/password.validation";
import { verifyClientToken } from "@src/middlewares/verfiyClientToken.middleware";
import { validateData } from "@src/middlewares/validation.middleware";
import forgotPassword from "@src/controllers/forgot-password.controller";
import resetPassword from "@src/controllers/reset-password.controller";
import changePassword from "@src/controllers/change-password.controller";

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
  verifyClientToken,
  validateData(changePasswordSchema),
  changePassword
);

export default passwordRouter;

// ** Third party imports
import { Router } from "express";

// ** Local imports
import {
  resendEmailSchema,
  verifyEmailSchema,
} from "@src/validations/verification.validation";
import verifyEmail from "@src/controllers/verify-email.controller";
import verifyOtp from "@src/controllers/verify-otp.controller";
import resendEmail from "@src/controllers/resend-email.controller";
import { validateData } from "@fvoid/shared-lib";

const verficationRouter = Router();

// ** Email verfication
verficationRouter.put(
  "/verify-email",
  validateData(verifyEmailSchema),
  verifyEmail
);

// ** Opt verfication
verficationRouter.put("/verify-otp/:otp", verifyOtp);

// ** Resend Email
verficationRouter.post(
  "/resend-email",
  validateData(resendEmailSchema),
  resendEmail
);

export default verficationRouter;

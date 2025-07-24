// ** Third party imports
import { Router } from "express";

// ** Local Imports
import {
  userLoginSchema,
  userRegistrationSchema,
} from "@src/validations/login-register.validation";
import register from "@src/controllers/register.controller";
import login from "@src/controllers/login.controller";
import { validateData } from "@fvoid/shared-lib";

const loginRegisterRouter = Router();

// ** Register
loginRegisterRouter.post(
  "/signup",
  validateData(userRegistrationSchema),
  register
);

// ** Login
loginRegisterRouter.post("/signin", validateData(userLoginSchema), login);

export default loginRegisterRouter;

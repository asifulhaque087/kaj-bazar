// ** Third Party Imports
import { Router } from "express";

// ** Config
import { config } from "@src/config";

// ** Middlewares
import { apiMiddleware } from "@src/middlewares/api.middleware";
import { verifyJwtToken } from "@src/middlewares/verify-jwt.middleware";

// ** Controllers
import authSeed from "@src/controllers/auth/auth-seed.controller";
import changePassword from "@src/controllers/auth/change-password.controller";
import currentUser from "@src/controllers/auth/current-user.controller";
import forgotPassword from "@src/controllers/auth/forgot-password.controller";
import login from "@src/controllers/auth/login.controller";
import logout from "@src/controllers/auth/logout.controller";
import refreshToken from "@src/controllers/auth/refresh-token.controller";
import register from "@src/controllers/auth/register.controller";
import resendEmail from "@src/controllers/auth/resend-email.controller";
import resetPassword from "@src/controllers/auth/reset-password.controller";
import verifyEmail from "@src/controllers/auth/verify-email.controller";
import verifyOtp from "@src/controllers/auth/verify-otp.controller";

const authRouter = Router();

authRouter.use(apiMiddleware(`${config.AUTH_BASE_URL}/api/v1/auth`, "auth"));

authRouter.post("/auth/signup", register);
authRouter.post("/auth/signin", login);
authRouter.post("/auth/signout", verifyJwtToken, logout);
authRouter.put("/auth/verify-email", verifyJwtToken, verifyEmail);
authRouter.put("/auth/verify-otp/:otp", verifyJwtToken, verifyOtp);
authRouter.post("/auth/resend-email", resendEmail);
authRouter.put("/auth/forgot-password", forgotPassword);
authRouter.put("/auth/reset-password/:token", resetPassword);
authRouter.put("/auth/change-password", verifyJwtToken, changePassword);
authRouter.get("/auth/refresh-token", verifyJwtToken, refreshToken);
authRouter.get("/auth/currentuser", verifyJwtToken, currentUser);
authRouter.put("/auth/seed/:count", authSeed);

export default authRouter;

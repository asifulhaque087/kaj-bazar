import type { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "@fvoid/shared-lib"; // Assuming this path is correct
import { config } from "@src/config"; // Assuming this path is correct
import jwt from "jsonwebtoken"; // Import the jsonwebtoken library

/**
 * Express middleware to verify a JWT token from the session and inject it
 * into the Authorization header of the protected Axios instance.
 *
 * This middleware assumes that:
 * 1. `cookie-session` middleware has been run previously, populating `req.session`.
 * 2. `apiMiddleware` has been run previously, populating `req.protectedAxios`.
 *
 * @param req The Express request object.
 * @param res The Express response object.
 * @param next The Express next middleware function.
 */
export const verifyJwtToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Access session data from req.session (provided by cookie-session middleware)
  const session = req.session;

  // If no session exists, the user is not authorized
  if (!session) throw new NotAuthorizedError();

  try {
    // Get the JWT token from the session
    const jwtToken = session.jwt;

    // If no JWT token is found in the session, the user is not authorized
    if (!jwtToken) {
      throw new NotAuthorizedError();
    }

    jwt.verify(jwtToken, config.JWT_TOKEN);

    const protectedAxios = req.protectedAxios!;

    protectedAxios.axios.defaults.headers[
      "Authorization"
    ] = `Bearer ${jwtToken}`;

    next();
  } catch (error) {
    throw new NotAuthorizedError();
  }
};

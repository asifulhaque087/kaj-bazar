import type { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "@fvoid/shared-lib"; // Assuming this path is correct
import { config } from "@src/config"; // Assuming this path is correct
import jwt from "jsonwebtoken"; // Import the jsonwebtoken library

export const verifyJwtToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Access session data from req.session (provided by cookie-session middleware)
  const session = req.session;

  // If no session exists, the user is not authorized
  if (!session) throw new NotAuthorizedError();

  // console.log("hello 1");

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

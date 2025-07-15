import jwt from "jsonwebtoken";
import { NotAuthorizedError } from "@fvoid/shared-lib"; // Assuming this is a custom error class
import { config } from "@src/config"; // Assuming this is your configuration file
import type { NextFunction, Request, Response } from "express";

// Define the shape of your JWT payload
type ClientJWTPayload = {
  id: number | undefined;
  email: string;
  username: string;
  exp: number;
};

// Extend Request to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: ClientJWTPayload;
    }
  }
}

export const verifyClientToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    throw new NotAuthorizedError();
  }

  try {
    const [bearer, jwtToken] = authHeader.split(" ");

    if (bearer !== "Bearer" || !jwtToken) {
      throw new NotAuthorizedError();
    }

    // Verify token
    const payload = jwt.verify(jwtToken, config.JWT_TOKEN) as ClientJWTPayload;

    req.user = payload; // Attach the payload to the request object
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    // If the token is invalid or expired, jwt.verify will throw an error
    throw new NotAuthorizedError();
  }
};

import jwt from "jsonwebtoken";
import { NotAuthorizedError } from "@fvoid/shared-lib";
import type { NextFunction, Request, Response } from "express";

type GatewayJWTPayload = {
  serviceName: string;
};

export const verifyGatewayToken = (
  secret: string,
  expectedServiceName: string
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const gatewayToken = req.header("gatewayToken");

    if (!gatewayToken) {
      throw new NotAuthorizedError();
    }

    try {
      const payload = jwt.verify(gatewayToken, secret) as GatewayJWTPayload;

      if (payload.serviceName !== expectedServiceName)
        throw new NotAuthorizedError();

      next();
    } catch (error) {
      throw new NotAuthorizedError();
    }
  };
};

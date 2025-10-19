import type { Request, Response, NextFunction } from "express";
import { AxiosService } from "@src/axios-services/axios"; // Assuming this path is correct

// Extend the Request interface to include your custom properties
// This is necessary for TypeScript to recognize publicAxios and protectedAxios on req
declare global {
  namespace Express {
    interface Request {
      publicAxios?: AxiosService;
      protectedAxios?: AxiosService;
    }
  }
}

/**
 * Express middleware factory to attach AxiosService instances to the request object.
 * @param baseURL The base URL for the Axios instances.
 * @param serviceName The name of the service.
 * @returns An Express middleware function.
 */
export const apiMiddleware = (baseURL: string, serviceName: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const publicInstance = AxiosService.create(baseURL, serviceName);
    const protectedInstance = AxiosService.create(baseURL, serviceName);

    req.publicAxios = publicInstance;
    req.protectedAxios = protectedInstance;

    next();
  };
};

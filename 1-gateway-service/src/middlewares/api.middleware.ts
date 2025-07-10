import { AxiosService } from "@src/axios-services/axios";
import { createMiddleware } from "hono/factory";

export const apiMiddleware = (baseURL: string, serviceName: string) => {
  return createMiddleware<{
    Variables: {
      publicAxios: AxiosService;
      protectedAxios: AxiosService;
    };
  }>(async (c, next) => {
    const publicInstance = await AxiosService.create(baseURL, serviceName);
    const protedtedInstance = await AxiosService.create(baseURL, serviceName);

    c.set("publicAxios", publicInstance);
    c.set("protectedAxios", protedtedInstance);

    await next();
  });
};

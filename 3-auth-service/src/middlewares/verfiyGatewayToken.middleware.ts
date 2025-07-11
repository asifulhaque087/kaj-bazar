import { NotAuthorizedError } from "@fvoid/shared-lib";
import { config } from "@src/config";
import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";

type Payload = {
  serviceName: string;
};

export const verifyGatewayToken = createMiddleware(async (c, next) => {
  const gatewayToken = c.req.header("gatewayToken");
  if (!gatewayToken) throw new NotAuthorizedError();

  try {
    // verify token
    const payload: Payload = (await verify(
      gatewayToken,
      `${config.GATEWAY_JWT_TOKEN}`
    )) as Payload;

    if (payload.serviceName !== "auth") throw new NotAuthorizedError();
  } catch (error) {
    throw new NotAuthorizedError();
  }

  await next();
});

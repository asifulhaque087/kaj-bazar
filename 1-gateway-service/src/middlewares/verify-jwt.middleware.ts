import { NotAuthorizedError } from "@fvoid/shared-lib";
import { config } from "@src/config";
import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";

import { Session } from "hono-sessions";
import type { AxiosService } from "@src/axios-services/axios";

type SessionData = {
  jwt?: string;
  userId?: string;
};

export const verifyJwtToken = createMiddleware<{
  Variables: {
    // publicAxios: AxiosService;
    protectedAxios: AxiosService;
    session: Session<SessionData>;
  };
}>(async (c, next) => {
  // Check session
  const session = c.get("session");
  if (!session) throw new NotAuthorizedError();

  try {
    // Check token
    const jwtToken = session.get("jwt");
    if (!jwtToken) throw new NotAuthorizedError();

    // verify token
    await verify(jwtToken, `${config.JWT_TOKEN}`);

    // Inject token
    const protectedAxios = c.get("protectedAxios");
    protectedAxios.axios.defaults.headers[
      "Authorization"
    ] = `Bearer ${jwtToken}`;

    // set axios intance to context
    c.set("protectedAxios", protectedAxios);
  } catch (error) {
    throw new NotAuthorizedError();
  }

  await next();
});

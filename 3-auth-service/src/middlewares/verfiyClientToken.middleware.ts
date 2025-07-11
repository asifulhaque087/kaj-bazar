import { NotAuthorizedError } from "@fvoid/shared-lib";
import { config } from "@src/config";
import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";

type Payload = {
  id: number | undefined;
  email: string;
  username: string;
  exp: number;
};

export const verifyClientToken = createMiddleware<{
  Variables: {
    // publicAxios: AxiosService;
    user: Payload;
  };
}>(async (c, next) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader) throw new NotAuthorizedError();

  try {
    // Check token

    const [bearer, jwtToken] = authHeader.split(" ");

    if (bearer !== "Bearer" || !jwtToken) throw new NotAuthorizedError();

    // verify token
    const payload: Payload = (await verify(
      jwtToken,
      `${config.JWT_TOKEN}`
    )) as Payload;

    c.set("user", payload);
  } catch (error) {
    throw new NotAuthorizedError();
  }

  await next();
});

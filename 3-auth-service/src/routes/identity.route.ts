// ** Third party imports
import { BadRequestError, NotFoundError } from "@fvoid/shared-lib";
import { config } from "@src/config";
import { db } from "@src/drizzle/db";
import { AuthTable } from "@src/drizzle/schema";
import { verifyClientToken } from "@src/middlewares/verfiyClientToken.middleware";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { sign } from "hono/jwt";

const identityRouter = new Hono();

// ** Refresh token
identityRouter.get("/refresh-token/:username", verifyClientToken, async (c) => {
  // get current user email and find user
  const user = c.get("user");

  const isUser = await db.query.AuthTable.findFirst({
    where: eq(AuthTable.email, user.email),
  });

  if (!isUser) throw new BadRequestError("Invalid token");

  // generate jwt
  const payload = {
    id: isUser?.id,
    email: isUser.email,
    username: isUser.username,
    exp: Math.floor(Date.now() / 1000) + 24 * 7 * 3600, // This will set the expiry to 7 days from now
  };

  const userJWT = await sign(payload, config.JWT_TOKEN);

  // return response
  return c.json({ message: "Refresh token", user: isUser, token: userJWT });
});

// ** Get Current User
identityRouter.get("/currentuser", verifyClientToken, async (c) => {
  // get current user email and find user
  const user = c.get("user");

  const isUser = await db.query.AuthTable.findFirst({
    where: eq(AuthTable.email, user.email),
  });

  if (!isUser) throw new NotFoundError();

  // return response
  return c.json({ message: "Authenticated user", user });
});

export default identityRouter;

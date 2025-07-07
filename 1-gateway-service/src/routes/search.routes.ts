// import type { SessionData } from "@src/app";
import { authService } from "@src/axios-services/auth.axios";
import { searchService } from "@src/axios-services/search.axios";
import type { AxiosResponse } from "axios";
import { Hono } from "hono";
import type { Session } from "hono-sessions";

type SessionData = {
  jwt?: string;
  userId?: string;
};

// type JwtPayload = {
//   userId: string;
//   email: string;
// };

type AppVariables = {
  session: Session<SessionData>;
  //   jwtPayload?: JwtPayload;
};

const searchRouter = new Hono<{ Variables: AppVariables }>();

searchRouter.get("/gig/search/:from/:size/:type", async (c) => {
  const { from, size, type } = c.req.param();

  const queryParams = c.req.query();

  let queryString = "";
  const objList = Object.entries(queryParams);
  const lastItemIndex = objList.length - 1;

  objList.forEach(([key, value], index) => {
    queryString += `${key}=${String(value)}${
      index !== lastItemIndex ? "&" : ""
    }`;
  });

  console.log("Constructed query string for gigService:", queryString);

  //   const response: AxiosResponse = await authService.signUp(body);

  // 4. Call your service:
  const response: AxiosResponse = await searchService.gigSearch(
    queryString,
    from,
    size,
    type
  );

  // 5. Send Response: In Hono, you *return* a Response object.
  // c.json() builds a JSON response with the specified data and status code.
  return c.json({
    message: response.data.message,
    total: response.data.total,
    gigs: response.data.gigs,
  });
});

searchRouter.get("/gig", async (c) => {
  console.log("hello from gig search");

  return c.json({
    message: "sucess",
  });
});

export default searchRouter;

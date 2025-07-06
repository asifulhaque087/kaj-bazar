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

class SearchRoutes {
  private router: Hono<{ Variables: AppVariables }>;

  constructor() {
    this.router = new Hono<{ Variables: AppVariables }>();
  }

  public routes(): Hono<{ Variables: AppVariables }> {
    this.router.get("/gig/search/:from/:size/:type", async (c) => {
      //   console.log("hello from gig search");
      const { from, size, type } = c.req.param();

      // 2. Access Query Parameters: Use c.req.query()
      // c.req.query() returns an object directly, e.g., { category: 'web', keyword: 'design' }
      const queryParams = c.req.query();

      // 3. Reconstruct Query String: If gigService.searchGigs *requires* a specific query string format
      let queryString = "";
      const objList = Object.entries(queryParams);
      const lastItemIndex = objList.length - 1;

      objList.forEach(([key, value], index) => {
        // Ensure value is treated as a string, as query params are always strings
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

    this.router.get("/gig", async (c) => {
      console.log("hello from gig search");

      return c.json({
        message: "sucess",
      });
    });

    return this.router;
  }
}

export const searchRoutes: SearchRoutes = new SearchRoutes();

// // usecase
// const { message, user, token, browserName, deviceType } = authServiceResponse;

// // 2. Set JWT in session
// const session = c.get('session'); // Get the session object from Hono's context
// session.set('jwt', token); // 'hono-sessions' will manage setting the cookie

// // You can set other session data too
// session.set('userId', user.id);

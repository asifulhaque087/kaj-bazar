// import type { SessionData } from "@src/app";
import { config } from "@src/config";
import searchGig from "@src/controllers/gig/search.controller";
import { apiMiddleware } from "@src/middlewares/api.middleware";
import { Router } from "express";

const gigRouter = Router();

gigRouter.use(apiMiddleware(`${config.GIG_BASE_URL}/api/v1/gig`, "gig"));

gigRouter.get("/gig/search/:from/:size/:type", searchGig);

// searchRouter.get("/gig", async (c) => {
//   console.log("hello from gig search");

//   return c.json({
//     message: "sucess",
//   });
// });

export default gigRouter;

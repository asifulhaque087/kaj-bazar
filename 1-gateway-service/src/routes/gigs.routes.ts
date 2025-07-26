// import type { SessionData } from "@src/app";
import { config } from "@src/config";
import getGigById from "@src/controllers/gigs/gig-by-id.controller";
import searchGig from "@src/controllers/gigs/search.controller";
import seedGigs from "@src/controllers/gigs/seed-gigs.controller";
import { apiMiddleware } from "@src/middlewares/api.middleware";
import { Router } from "express";

const gigRouter = Router();

gigRouter.use(apiMiddleware(`${config.GIG_BASE_URL}/api/v1/gigs`, "gigs"));

// gigRouter.get("/search/:from/:size/:type", searchGig);
gigRouter.get("/search", searchGig);
gigRouter.get("/:gigId", getGigById);

gigRouter.put("/seed/:count", seedGigs);

// searchRouter.get("/gig", async (c) => {
//   console.log("hello from gig search");

//   return c.json({
//     message: "sucess",
//   });
// });

export default gigRouter;

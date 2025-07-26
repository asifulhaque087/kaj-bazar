import getGigById from "@src/controllers/gig-by-id.controller";
import searchGigs from "@src/controllers/search-gigs.controller";
import { Router, type Request, type Response } from "express";

const queryRouter: Router = Router();

queryRouter.get("/search", searchGigs);

queryRouter.get("/seller/:sellerId", (req: Request, res: Response) => {
  return res.json({ m: "I am from Get Gigs by seller id" });
});
queryRouter.get("/seller/pause/:sellerId", (req: Request, res: Response) => {
  return res.json({ m: "I am from Get Paused Gigs by seller id" });
});

// queryRouter.get("/search/:from/:size/:type", (req: Request, res: Response) => {
//   return res.json({ m: "I am from Search gigs" });
// });

queryRouter.get("/category/:username", (req: Request, res: Response) => {
  return res.json({ m: "I am from Get Gigs by category" });
});

queryRouter.get("/top/:username", (req: Request, res: Response) => {
  return res.json({ m: "I am from Top gigs of a user" });
});

queryRouter.get("/similar/:gigId", (req: Request, res: Response) => {
  return res.json({ m: "I am from GEt Simillar gigs" });
});

queryRouter.get("/:gigId", getGigById);

export default queryRouter;

// ########################

// const gigRoutes = (): Router => {
//   router.get("/:gigId", gigById);
//   router.get("/seller/:sellerId", sellerGigs);
//   router.get("/seller/pause/:sellerId", sellerInactiveGigs);
//   router.get("/search/:from/:size/:type", gigs);
//   router.get("/category/:username", gigsByCategory);
//   router.get("/top/:username", topRatedGigsByCategory);
//   router.get("/similar/:gigId", moreLikeThis);
//   router.post("/create", gigCreate);
//   router.put("/:gigId", gigUpdate);
//   router.put("/active/:gigId", gigUpdateActive);
//   router.put("/seed/:count", gig);
//   router.delete("/:gigId/:sellerId", gigDelete);

//   return router;
// };

// export { gigRoutes };
